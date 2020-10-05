(ns image-gallery.core
    (:require
      [image-gallery.state :as state]
      [clojure.core.async :refer [go <! timeout go-loop]]
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]
      [image-gallery.store :as store]
      [reagent.dom :as d]))

;; -------------------------
;; Views

(defn image-details []
  (let [pending-comment (atom "")]
    (fn []
      (let [is-saving @(r/track state/is-saving)
            images @(r/track state/images)
            image @(r/track state/active-image)]
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
                                            (store/dispatch! :save-comment-clicked @pending-comment)
                                            (reset! pending-comment ""))
                               :disable (str is-saving)}
                      (if is-saving "Saving..." "Comment")]]]]])]]))))

(defn image-selector []
  (let [active-image @(r/track state/active-image-index)
        images @(r/track state/images)]
    [:image-selector (doall
                       (map-indexed
                         (fn [i v]
                           [:div {:key i
                                  :class ["image-thumbnail"
                                          (when (= active-image i) "active")]}
                            [:img {:src (:url v)
                                   :on-click #(store/dispatch! :image-clicked i)}]])
                         images))]))

(defn image-gallery-view []
  [:image-gallery.column
   [:div
    [image-selector]
    [image-details]]])

(defn image-gallery-app []
  [image-gallery-view])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [image-gallery-app]
            (.getElementById js/document "app")))

(defn init! []
  (state/init)
  (mount-root))
