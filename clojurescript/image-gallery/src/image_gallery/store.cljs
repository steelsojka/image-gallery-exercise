(ns image-gallery.store
  (:require
    [clojure.core.async :refer [chan pub sub put! go-loop <!]]))

(def channel (chan 1))
(def bus (pub channel ::type))

(defn dispatch!
  ([type] (dispatch! type nil))
  ([type payload]
   (put! channel {::type type
                  ::payload payload})))

(defn subscribe [type handler]
  (let [sub-chan (chan)]
    (sub bus type sub-chan)
    (go-loop []
      (handler (::payload (<! sub-chan)))
      (recur))))

(defn subscribe-all [handler-map]
  (doall
    (map #(subscribe (nth % 0) (nth % 1)) handler-map)))
