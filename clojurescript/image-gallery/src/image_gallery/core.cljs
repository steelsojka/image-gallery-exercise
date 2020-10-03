(ns image-gallery.core
    (:require
      [image-gallery.state :as s]
      [clojure.core.async :refer [go <! timeout go-loop]]
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]
      [reagent.dom :as d]))

;; -------------------------
;; Views

(defn image-details [state]
  (let [pending-comment (atom "")]
    (fn []
      (let [{:keys [is-saving images active-image]} @state
            image (if active-image (nth images active-image) nil)]
        [:image-details
         [:div (if (not image)
                 [:h1 "Please select an image"]
                 [:div
                  [:div {:class "image-container"}
                   [:img {:src (:url image)}]]
                  [:div {:class "comments-container"}
                   [:h4 "Comments"]
                   [:div {:class "comment-list"} (doall
                                                   (map-indexed #(do [:div {:key %1 } %2]) (:comments image)))]
                   [:div
                    [:textarea {:disable (str is-saving)
                                :value @pending-comment
                                :on-change #(reset! pending-comment (->> %1 (.-target) (.-value)))}]
                    [:div
                     [:button {:on-click #(do
                                            (s/on-save-comment-click @pending-comment)
                                            (reset! pending-comment ""))
                               :disable (str is-saving)}
                      (if is-saving "Saving..." "Comment")]]]]])]]))))

(defn image-selector [state]
  (let [{:keys [active-image images]} @state]
    [:image-selector (doall
                       (map-indexed
                         (fn [i v]
                           [:div {:key i
                                  :class (->> (if (= active-image i)
                                               ["image-thumbnail" "active"]
                                               ["image-thumbnail"])
                                              (str/join " "))}
                            [:img {:src (:url v)
                                   :on-click #(s/on-image-click i)}]])
                         images))]))

(defn image-gallery-view [state]
  [:image-gallery.column
   [:div
    [image-selector state]
    [image-details state]]])

(defn image-gallery-app [state]
  [image-gallery-view state])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [image-gallery-app s/state] (.getElementById js/document "app")))

(defn init! [] (mount-root))
