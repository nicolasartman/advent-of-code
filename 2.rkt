#lang racket

(require 2htdp/batch-io)

(define (calc-paper-needed l w h)
  (let ([side-areas (list (* l w) (* w h) (* h l))])
    (+ (apply min side-areas)
       (* 2 (apply + side-areas)))))

(let ([package-dimensions (map (lambda (dims) (map string->number (string-split dims "x")))
                               (string-split (read-file "2-input.txt")))])
  (print package-dimensions)
  (apply + (map (lambda (dims) (apply calc-paper-needed dims)) package-dimensions)))