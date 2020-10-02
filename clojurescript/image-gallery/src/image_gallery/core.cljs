(ns image-gallery.core
    (:require
      [clojure.core.async :as async]
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]
      [reagent.dom :as d]))

;; -------------------------
;; State
(defn- make-image [url] {:url url :comments []})
(defn- get-images []
  (->> (range 1 8)
       (map #(make-image (str "/assets/image_" % ".jpg")))
       (into [])))

(defonce state (atom {:is-saving false
                      :active-image nil
                      :images (get-images)
                      :pending-comment ""}))

(defn- on-image-click [index]
  (swap! state assoc :active-image index))

(defn- on-comment-change [text]
  (swap! state assoc :pending-comment text))

(defn- on-save-success []
  (swap! state assoc :is-saving false))

(defn- on-save-comment-click []
  (swap! state
         (fn [v]
           (let [{:keys [images active-image pending-comment]} v]
             (assoc v
                    :pending-comment ""
                    :is-saving true
                    :images (update-in images [active-image :comments] #(conj % pending-comment))))))
  ; Fake ajax request
  (async/go
    (async/<! (async/timeout 2000))
    (on-save-success)))

;; -------------------------
;; Views

(defn image-details []
  (let [{:keys [is-saving pending-comment images active-image]} @state
        image (if active-image (nth images active-image) nil)]
    [:image-details
     [:div (if (not image)
             [:h1 "Please select an image"]
             [:div
              [:div {:class "image-container"}
               [:img {:src (image :url)}]]
              [:div {:class "comments-container"}
               [:h4 "Comments"]
               [:div {:class "comment-list"} (doall
                                               (map #(do [:div %]) (image :comments)))]
               [:div
                [:textarea {:disable (str is-saving)
                            :value pending-comment
                            :on-change #(on-comment-change (->> %1 (.-target) (.-value)))}]
                [:div
                 [:button {:on-click #(on-save-comment-click)
                           :disable (str is-saving)}
                  (if is-saving "Saving..." "Comment")]]]]])]]))

(defn image-selector []
  (let [{:keys [active-image images]} @state]
    [:image-selector (doall
                       (map-indexed
                         (fn [i v]
                           [:div {:key i
                                  :class (->> (if (= active-image i)
                                               ["image-thumbnail" "active"]
                                               ["image-thumbnail"])
                                              (str/join " "))}
                            [:img {:src (v :url)
                                   :on-click #(on-image-click i)}]])
                         (:images @state)))]))

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
  (d/render [image-gallery-app] (.getElementById js/document "app")))

(defn init! [] (mount-root))
