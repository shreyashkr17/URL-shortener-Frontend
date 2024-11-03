// C# language 
export const csharpHttpClient = `var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Post, "https://njs.shortlycut.xyz/shorten");
request.Headers.Add("X-API-Token", "<API_TOKEN>");
request.Headers.Add("Cookie", "auth_token=<AUTH_TOKEN>");
var content = new StringContent("{\"original_url\": \"www.google.com\"}", null, "application/json");
request.Content = content;
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
`

export const csharpRestSharp = `
var options = new RestClientOptions("https://njs.shortlycut.xyz")
{
  MaxTimeout = -1,
};
var client = new RestClient(options);
var request = new RestRequest("/shorten", Method.Post);
request.AddHeader("Content-Type", "application/json");
request.AddHeader("X-API-Token", "<API_TOKEN>");
request.AddHeader("Cookie", "auth_token=<AUTH_TOKEN>");
var body = @"{""original_url"": ""www.google.com""}";
request.AddStringBody(body, DataFormat.Json);
RestResponse response = await client.ExecuteAsync(request);
Console.WriteLine(response.Content);`


// cURL Command

export const cURLCommand = `curl --location 'https://njs.shortlycut.xyz/shorten' \
--header 'Content-Type: application/json' \
--header 'X-API-Token: <API_TOKEN>' \
--header 'Cookie: auth_token=<AUTH_TOKEN>' \
--data '{"original_url": "www.google.com"}'`


// Dart Command

export const dartDioCmnd = `var headers = {
  'Content-Type': 'application/json',
  'X-API-Token': '<API_TOKEN>',
  'Cookie': 'auth_token=<AUTH_TOKEN>'
};
var data = json.encode({
  "original_url": "www.google.com"
});
var dio = Dio();
var response = await dio.request(
  'https://njs.shortlycut.xyz/shorten',
  options: Options(
    method: 'POST',
    headers: headers,
  ),
  data: data,
);

if (response.statusCode == 200) {
  print(json.encode(response.data));
}
else {
  print(response.statusMessage);
}`

export const dartHttpCmnd = `var headers = {
  'Content-Type': 'application/json',
  'X-API-Token': '<API_TOKEN>',
  'Cookie': 'auth_token=<AUTH_TOKEN>'
};
var request = http.Request('POST', Uri.parse('https://njs.shortlycut.xyz/shorten'));
request.body = json.encode({
  "original_url": "www.google.com"
});
request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
}
else {
  print(response.reasonPhrase);
}
`

// Go Native
export const goCmnd = `package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://njs.shortlycut.xyz/shorten"
  method := "POST"

  payload := strings.NewReader(\`{"original_url": "www.google.com"}\`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")
  req.Header.Add("X-API-Token", "<API_TOKEN>")
  req.Header.Add("Cookie", "auth_token=<AUTH_TOKEN>")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}`

// HTTP Command
export const httpCmnd = `POST /shorten HTTP/1.1
Host: njs.shortlycut.xyz
Content-Type: application/json
X-API-Token: <API_TOKEN>
Cookie: auth_token=<AUTH_TOKEN>
Content-Length: 34

{"original_url": "www.google.com"}`

// Java Language
export const javaCmnd = `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"original_url\": \"www.google.com\"}");
Request request = new Request.Builder()
  .url("https://njs.shortlycut.xyz/shorten")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("X-API-Token", "<API_TOKEN>")
  .addHeader("Cookie", "auth_token=<AUTH_TOKEN>")
  .build();
Response response = client.newCall(request).execute();`

export const javaUnirest = `Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.post("https://njs.shortlycut.xyz/shorten")
  .header("Content-Type", "application/json")
  .header("X-API-Token", "<API_TOKEN>")
  .header("Cookie", "auth_token=<AUTH_TOKEN>")
  .body("{\"original_url\": \"www.google.com\"}")
  .asString();
`

// JavaScript Language
export const xmlHttpRequestCode = `
// WARNING: For POST requests, body is set to null by browsers.
var data = JSON.stringify({
  "original_url": "www.google.com"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://njs.shortlycut.xyz/shorten");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("X-API-Token", "<API_TOKEN>");
// WARNING: Cookies will be stripped away by the browser before sending the request.
xhr.setRequestHeader("Cookie", "auth_token=<AUTH_TOKEN>");

xhr.send(data);`;

export const javscriptFetchCmnd = `const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("X-API-Token", "<API_TOKEN>");
myHeaders.append("Cookie", "auth_token=<AUTH_TOKEN>");

const raw = JSON.stringify({
  "original_url": "www.google.com"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://njs.shortlycut.xyz/shorten", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`
  

export const  javscriptJQuery = `var settings = {
  "url": "https://njs.shortlycut.xyz/shorten",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json",
    "X-API-Token": "<API_TOKEN>",
    "Cookie": "auth_token=<AUTH_TOKEN>"
  },
  "data": JSON.stringify({
    "original_url": "www.google.com"
  }),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});`

export const KotlinOkHttp = `val client = OkHttpClient()
val mediaType = "application/json".toMediaType()
val body = "{\"original_url\": \"www.google.com\"}".toRequestBody(mediaType)
val request = Request.Builder()
  .url("https://njs.shortlycut.xyz/shorten")
  .post(body)
  .addHeader("Content-Type", "application/json")
  .addHeader("X-API-Token", "<API_TOKEN>")
  .addHeader("Cookie", "auth_token=<AUTH_TOKEN>")
  .build()
val response = client.newCall(request).execute()`


// C Language
export const ClibCurl = `CURL *curl;
CURLcode res;
curl = curl_easy_init();
if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_easy_setopt(curl, CURLOPT_URL, "https://njs.shortlycut.xyz/shorten");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "Content-Type: application/json");
  headers = curl_slist_append(headers, "X-API-Token: <API_TOKEN>");
  headers = curl_slist_append(headers, "Cookie: auth_token=<AUTH_TOKEN>");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  const char *data = "{\"original_url\": \"www.google.com\"}";
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
  res = curl_easy_perform(curl);
  curl_slist_free_all(headers);
}
curl_easy_cleanup(curl);
`

// NodeJS Framework

export const nodeJSAxios = `const axios = require('axios');
let data = JSON.stringify({
  "original_url": "www.google.com"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://njs.shortlycut.xyz/shorten',
  headers: { 
    'Content-Type': 'application/json', 
    'X-API-Token': '<API_TOKEN>', 
    'Cookie': 'auth_token=<AUTH_TOKEN>'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
`

export const nodejsNative = `var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'njs.shortlycut.xyz',
  'path': '/shorten',
  'headers': {
    'Content-Type': 'application/json',
    'X-API-Token': '<API_TOKEN>',
    'Cookie': 'auth_token=<AUTH_TOKEN>'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "original_url": "www.google.com"
});

req.write(postData);

req.end();`

export const nodejsRequest = `var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://njs.shortlycut.xyz/shorten',
  'headers': {
    'Content-Type': 'application/json',
    'X-API-Token': '<API_TOKEN>',
    'Cookie': 'auth_token=<AUTH_TOKEN>'
  },
  body: JSON.stringify({
    "original_url": "www.google.com"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
`

export const nodejsUnirest = `var unirest = require('unirest');
var req = unirest('POST', 'https://njs.shortlycut.xyz/shorten')
  .headers({
    'Content-Type': 'application/json',
    'X-API-Token': '<API_TOKEN>',
    'Cookie': 'auth_token=<AUTH_TOKEN>'
  })
  .send(JSON.stringify({
    "original_url": "www.google.com"
  }))
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });
`

// Objective C
export const objC = `#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://njs.shortlycut.xyz/shorten"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];
NSDictionary *headers = @{
  @"Content-Type": @"application/json",
  @"X-API-Token": @"<API_TOKEN>",
  @"Cookie": @"auth_token=<AUTH_TOKEN>"
};

[request setAllHTTPHeaderFields:headers];
NSData *postData = [[NSData alloc] initWithData:[@"{\"original_url\": \"www.google.com\"}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

[request setHTTPMethod:@"POST"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
  if (error) {
    NSLog(@"%@", error);
    dispatch_semaphore_signal(sema);
  } else {
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
    NSError *parseError = nil;
    NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
    NSLog(@"%@",responseDictionary);
    dispatch_semaphore_signal(sema);
  }
}];
[dataTask resume];
dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);`


// OCaml Cmnd
export const ocamlCmnd = `open Lwt
open Cohttp
open Cohttp_lwt_unix

let postData = ref "{\"original_url\": \"www.google.com\"}";;

let reqBody = 
  let uri = Uri.of_string "https://njs.shortlycut.xyz/shorten" in
  let headers = Header.init ()
    |> fun h -> Header.add h "Content-Type" "application/json"
    |> fun h -> Header.add h "X-API-Token" "<API_TOKEN>"
    |> fun h -> Header.add h "Cookie" "auth_token=<AUTH_TOKEN>"
  in
  let body = Cohttp_lwt.Body.of_string !postData in

  Client.call ~headers ~body \`POST uri >>= fun (_resp, body) ->
  body |> Cohttp_lwt.Body.to_string >|= fun body -> body

let () =
  let respBody = Lwt_main.run reqBody in
  print_endline (respBody)`


  // PHP Language
  export const phpCurl = `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://njs.shortlycut.xyz/shorten',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{"original_url": "www.google.com"}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'X-API-Token: <API_TOKEN>',
    'Cookie: auth_token=<AUTH_TOKEN>'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
`

  export const phpGuzzle = `<?php
$client = new Client();
$headers = [
  'Content-Type' => 'application/json',
  'X-API-Token' => '<API_TOKEN>',
  'Cookie' => 'auth_token=<AUTH_TOKEN>'
];
$body = '{
  "original_url": "www.google.com"
}';
$request = new Request('POST', 'https://njs.shortlycut.xyz/shorten', $headers, $body);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
`


export const phpHttpRequest2 = `<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://njs.shortlycut.xyz/shorten');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Content-Type' => 'application/json',
  'X-API-Token' => '<API_TOKEN>',
  'Cookie' => 'auth_token=<AUTH_TOKEN>'
));
$request->setBody('{"original_url": "www.google.com"}');
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}`

export const phpPeclHttp = `<?php
$client = new http\Client;
$request = new http\Client\Request;
$request->setRequestUrl('https://njs.shortlycut.xyz/shorten');
$request->setRequestMethod('POST');
$body = new http\Message\Body;
$body->append('{"original_url": "www.google.com"}');
$request->setBody($body);
$request->setOptions(array());
$request->setHeaders(array(
  'Content-Type' => 'application/json',
  'X-API-Token' => '<API_TOKEN>',
  'Cookie' => 'auth_token=<AUTH_TOKEN>'
));
$client->enqueue($request)->send();
$response = $client->getResponse();
echo $response->getBody();
`
// Python Language
export  const pythonCmnd = `import http.client
import json

conn = http.client.HTTPSConnection("njs.shortlycut.xyz")
payload = json.dumps({
  "original_url": "www.google.com"
})
headers = {
  'Content-Type': 'application/json',
  'X-API-Token': '<API_TOKEN>',
  'Cookie': 'auth_token=<AUTH_TOKEN>'
}
conn.request("POST", "/shorten", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))`

export const pythonRequest = `import requests
import json

url = "https://njs.shortlycut.xyz/shorten"

payload = json.dumps({
  "original_url": "www.google.com"
})
headers = {
  'Content-Type': 'application/json',
  'X-API-Token': '<API_TOKEN>',
  'Cookie': 'auth_token=<AUTH_TOKEN>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
`

// R Language
export const rHttr = `library(httr)

headers = c(
  'Content-Type' = 'application/json',
  'X-API-Token' = '<API_TOKEN>',
  'Cookie' = 'auth_token=<AUTH_TOKEN>'
)

body = '{
  "original_url": "www.google.com"
}';

res <- VERB("POST", url = "https://njs.shortlycut.xyz/shorten", body = body, add_headers(headers))

cat(content(res, 'text'))`

export const rCutl = `library(RCurl)
headers = c(
  "Content-Type" = "application/json",
  "X-API-Token" = "<API_TOKEN>",
  "Cookie" = "auth_token=<AUTH_TOKEN>"
)
params = "{
  \"original_url\": \"www.google.com\"
}"
res <- postForm("https://njs.shortlycut.xyz/shorten", .opts=list(postfields = params, httpheader = headers, followlocation = TRUE), style = "httppost")
cat(res)`

export const RustReqwest = `#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::builder()
        .build()?;

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("Content-Type", "application/json".parse()?);
    headers.insert("X-API-Token", "<API_TOKEN>".parse()?);
    headers.insert("Cookie", "auth_token=<AUTH_TOKEN>".parse()?);

    let data = r#"{
    "original_url": "www.google.com"
}"#;

    let json: serde_json::Value = serde_json::from_str(&data)?;

    let request = client.request(reqwest::Method::POST, "https://njs.shortlycut.xyz/shorten")
        .headers(headers)
        .json(&json);

    let response = request.send().await?;
    let body = response.text().await?;

    println!("{}", body);

    Ok(())
}`



