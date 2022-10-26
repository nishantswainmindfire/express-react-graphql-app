 @echo off  
 start ab -n 20 -c 20 -H 'Accept-Encoding: gzip, deflate, br' -H  'Accept-Encoding: gzip, deflate, br' -H 'Accept: application/json' -H 'Origin:http://www.domain1.com:8080' -T 'application/json' -p D:/test/post.txt 'http://www.domain1.com:8080/graphql'
 
 start ab -n 20 -c 20 -H 'Accept-Encoding: gzip, deflate, br' -H  'Accept-Encoding: gzip, deflate, br' -H 'Accept: application/json' -H 'Origin:http://www.domain2.com:8080' -T 'application/json' -p D:/test/post.txt 'http://www.domain2.com:8080/graphql'

 PAUSE