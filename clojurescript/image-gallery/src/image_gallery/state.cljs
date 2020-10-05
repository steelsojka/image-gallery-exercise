(ns image-gallery.state
    (:require
      [clojure.core.async :refer [go <! >! timeout chan]]
      [reagent.core :as r :refer [atom]]
      [clojure.string :as str]
      [image-gallery.store :as store]))

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

(defn image-clicked! [index]
  (swap! state assoc :active-image index))

(defn save-successful! [saved-comment]
  (swap! state assoc :is-saving false))

(defn save-comment-clicked! [pending-comment]
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
    (store/dispatch! :save-successful pending-comment)))

(defn init []
  "Connects the store to our state handlers"
  (store/subscribe-all {:image-clicked image-clicked!
                        :save-successful save-successful!
                        :save-comment-clicked save-comment-clicked!}))

;; ------------------------
;; Selectors

(defn active-image-index [] (:active-image @state))
(defn images [] (:images @state))
(defn is-saving [] (:is-saving @state))
(defn active-image []
  (let [index @(r/track active-image-index)
        images @(r/track images)]
    (if index (nth images index) nil)))
