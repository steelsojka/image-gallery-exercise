(ns image-gallery.state
    (:require
      [clojure.core.async :refer [go <! >! timeout chan]]
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]))

;; -------------------------
;; State

(defn- make-image [url] {:url url :comments []})
(defn- get-images []
  (->> (range 1 8)
       (map #(make-image (str "/assets/image_" % ".jpg")))
       (into [])))

(defonce state (atom {:is-saving false
                      :active-image nil
                      :images (get-images)}))

(defn on-image-click [index]
  (swap! state assoc :active-image index))

(defn on-save-success [saved-comment]
  (swap! state assoc :is-saving false))

(defn on-save-comment-click [pending-comment]
  (swap! state
         (fn [v]
           (let [{:keys [images active-image]} v]
             (assoc v
                    :is-saving true
                    :images (update-in images [active-image :comments]
                                       #(conj % pending-comment))))))
  ; Fake ajax request
  (go
    (<! (timeout 2000))
    (on-save-success pending-comment)))
