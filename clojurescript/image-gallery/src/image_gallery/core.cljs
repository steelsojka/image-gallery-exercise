(ns image-gallery.core
    (:require
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]
      [reagent.dom :as d]))

;; -------------------------
;; State
(defn- make-image [url] {:url url :comments []})
(defn- get-images [] [(make-image "http://google.com")
                     (make-image "http://blorg.com")])

(defonce state (atom {:is-saving false
                      :active-image nil
                      :images (get-images)
                      :pending-comment ""}))

(defn- on-image-click [index]
  (swap! state assoc :active-image index))

(defn- on-comment-change [text]
  (swap! state assoc :pending-comment text))

(defn- on-save-comment-click []
  (swap! state
         (fn [v]
           (let [images (:images v)
                 image (->> (:active-image v)
                            (images))
                 comment (:pending-comment v)]
             (->> (conj (:comment image) comment)
                  (assoc image :comments)
                  (assoc images (:active-image v))
                  (assoc v :images))))))

;; -------------------------
;; Views

(defn image-details []
  (let [image (get-in @state
                      [:images (:active-image @state)])]
    [:image-details
     [:div (if (not image)
             [:h1 "Please select an image"]
             [:div
              [:div {:class "image-container"}
               [:img {:src (:url image)}]]
              [:div {:class "comments-container"}
               [:h4 "Comments"]
               [:div {:class "comment-list"} (doall
                                               (map #(do [:div %1])
                                                    (:comments image)))]
               [:div
                [:textarea {:disable (:is-saving @state)
                            :value (:pending-comment @state)
                            :on-change #(on-comment-change (. %1 -target -value))}]
                [:div
                 [:button {:on-click #(on-save-comment-click)} (if (:is-saving @state)
                                                                 "Saving..."
                                                                 "Comment")]]]]])]]))

(defn image-selector []
  [:image-selector (doall
                     (map-indexed
                       (fn [i v]
                         [:div {:key i
                                :class (->> (if (= (:active-image @state) i)
                                             ["image-thumbnail" "active"]
                                             ["image-thumbnail"])
                                            (str/join " "))}
                          [:img {:src (:url v)
                                 :on-click #(on-image-click i)}]])
                       (:images @state)))])

(defn image-gallery-view []
  [:image-gallery.column
   [:div [image-selector]]])

(defn image-gallery-app []
  [image-gallery-view])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [image-gallery-app] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
