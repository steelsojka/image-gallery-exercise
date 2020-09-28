(ns image-gallery.core
    (:require
      [reagent.core :as r]
      [clojure.string :as str]
      [reagent.dom :as d]))

(defn make-image [url] {:url url :comments []})
(defn get-images [] [(make-image "http://google.com")
                     (make-image "http://blorg.com")])

;; -------------------------
;; Views

(defn image-selector [state]
  [:image-selector (doall
                     (map-indexed
                       (fn [i v]
                         [:div {:key i
                                :class (->> (if (= (:active-image @state) i)
                                             ["image-thumbnail" "active"]
                                             ["image-thumbnail"])
                                           (str/join " "))}
                          [:img {:src (:url v)
                                 :on-click #(reset! state (assoc @state :active-image i))}]])
                       (:images @state)))])

(defn image-gallery-view [state]
  [:image-gallery.column
   [:div [image-selector state]]])

(defn image-gallery-app []
  (let [state
        (r/atom {:is-saving false
                 :active-image nil
                 :images (get-images)
                 :pending-comment "Nope"})]
    [image-gallery-view state]))

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [image-gallery-app] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
