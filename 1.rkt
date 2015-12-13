#lang racket

(require 2htdp/batch-io)

(define (get-first-basement-descent-step steps current-floor current-step)
  (cond
    [(equal? current-floor -1) current-step]
    [(equal? #\( (first steps))
     (get-first-basement-descent-step (rest steps) (+ current-floor 1) (+ 1 current-step))]
    [#t
     (get-first-basement-descent-step (rest steps) (- current-floor 1) (+ 1 current-step))]))

(print (let ([data (string->list (read-file "1-input.txt"))])
  (get-first-basement-descent-step data 0 0)))
