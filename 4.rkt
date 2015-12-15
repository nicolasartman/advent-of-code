#lang racket

(require file/md5)

(define secret "yzbqklnj")

(define (find-result num leading-zeroes)
  (let* ([secret-and-number (string-join (list secret (number->string num)) "")]
         [md5-hash (~a (md5 secret-and-number #t))])
    (when (equal? (modulo num 100000) 0)
      (println (string-join (list "Checked" (number->string num)))))
    (if (string-prefix? md5-hash (make-string leading-zeroes #\0))
        num
        (find-result (add1 num) leading-zeroes))))

(find-result 0 5)
(find-result 0 6)


