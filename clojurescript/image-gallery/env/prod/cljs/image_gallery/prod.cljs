(ns image-gallery.prod
  (:require
    [image-gallery.core :as core]))

;;ignore println statements in prod
(set! *print-fn* (fn [& _]))

(core/init!)
