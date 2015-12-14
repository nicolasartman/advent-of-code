#lang racket

(require 2htdp/batch-io)

;; first part

(define (calc-paper-needed l w h)
  (let ([side-areas (list (* l w) (* w h) (* h l))])
    (+ (apply min side-areas)
       (* 2 (apply + side-areas)))))

(define (calc-ribbon-needed l w h)
  (let ([wrap-length (* 2
                        (let* ([smallest-dim (min l w h)]
                               [second-smallest-dim (apply min (remove smallest-dim (list l w h)))])
                          (+ smallest-dim second-smallest-dim)))]
        [bow-length (* l w h)])
    (+ wrap-length bow-length)))

(let ([package-dimensions (map (lambda (dims) (map string->number (string-split dims "x")))
                               (string-split (read-file "2-input.txt")))])
  (let ([result-pairs (map (lambda (dims) (list
                                           (apply calc-paper-needed dims)
                                           (apply calc-ribbon-needed dims)))
                           package-dimensions)])
    (map (lambda (result-pair-getter)
           (foldl (lambda (result-pair sum) (+ sum (result-pair-getter result-pair))) 0 result-pairs))
         (list first second))))