#lang racket

(require test-engine/racket-tests)
(require 2htdp/batch-io)

(define (nice-string? input)
  (and (regexp-match #px"([a-z])\\1{1,}" input)
       (regexp-match #px"([aeiou].*){3,}" input)
       (not (regexp-match #px"(ab|cd|pq|xy)" input))))

(check-expect (nice-string? "dbbc") #f)
(check-expect (nice-string? "dbbcoiu") #t)

(test)

(let ([data (string->list (read-file "5-input.txt"))])