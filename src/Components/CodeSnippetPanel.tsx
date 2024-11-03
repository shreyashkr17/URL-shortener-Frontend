// import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as darkTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  csharpHttpClient,
  csharpRestSharp,
  cURLCommand,
  dartDioCmnd,
  dartHttpCmnd,
  goCmnd,
  httpCmnd,
  javaCmnd,
  javaUnirest,
  javscriptFetchCmnd,
  javscriptJQuery,
  KotlinOkHttp,
  ClibCurl,
  nodeJSAxios,
  nodejsNative,
  nodejsRequest,
  nodejsUnirest,
  objC,
  ocamlCmnd,
  phpCurl,
  phpGuzzle,
  phpHttpRequest2,
  phpPeclHttp,
  pythonCmnd,
  pythonRequest,
  rHttr,
  rCutl,
  RustReqwest,
  xmlHttpRequestCode,
} from "@/data/data";

const CodeBlock: React.FC<{ code: string; language: string }> = ({
  code,
  language,
}) => {
  return (
    <SyntaxHighlighter language={language} style={darkTheme}>
      {/* <> */}
      {code}
      {/* </> */}
    </SyntaxHighlighter>
  );
};

const CodeSnippetPanel: React.FC = () => {
  // const codeRef = useRef<HTMLElement>(null);

  return (
    <Card className="w-full h-auto flex justify-start items-center">
      <CardBody>
        <Tabs aria-label="Options">
          <Tab key="js" title="Javascript" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="xml" title="XMLHttpRequest">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="jsx" code={xmlHttpRequestCode} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="jquery" title="jQuery">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="jsx" code={javscriptJQuery} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="fetch" title="Fetch">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="jsx" code={javscriptFetchCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="csharp" title="C#" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="httpClient" title="HttpClient">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="csharp" code={csharpHttpClient} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="restSharp" title="RestSharp">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="csharp" code={csharpRestSharp} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="bash" title="cURL" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="cURLCommand" title="cURL Command">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="bash" code={cURLCommand} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="dart" title="Dart" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="dio" title="Dio">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="dart" code={dartDioCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="httpdart" title="Dart Http">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="dart" code={dartHttpCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="go" title="Go" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="go" title="Go">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="go" code={goCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="http" title="Http" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="http" title="Http Command">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="bash" code={httpCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="java" title="Java" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="java" title="Java">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="java" code={javaCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="javaUnirest" title="Unirest">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="java" code={javaUnirest} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="kotlin" title="Kotlin" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="okHttp" title="Ok Http">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="kotlin" code={KotlinOkHttp} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="Clib" title="C lib" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="cURl" title="C lib cURL">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="cpp" code={ClibCurl} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="nodejs" title="Node.JS" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="axios" title="Axios">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="javascript" code={nodeJSAxios} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="native" title="Native">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="javascript" code={nodejsNative} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="request" title="Request">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="javascript" code={nodejsRequest} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="unirest" title="Unirest">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="javascript" code={nodejsUnirest} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="objC" title="Objective C" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="objCclient" title="Objective C">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="objectivec" code={objC} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="ocaml" title="OCaml" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="ocamlClient" title="OCaml">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="javascript" code={ocamlCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="php" title="PHP" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="phpCurl" title="PHP cURL">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="php" code={phpCurl} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="phpGuzzle" title="PHP Guzzle">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="php" code={phpGuzzle} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="phpHttp" title="PHP Http Request">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="php" code={phpHttpRequest2} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="phpPecl" title="PHP Pecl Request">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="php" code={phpPeclHttp} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="python" title="Python" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="pythonCmnd" title="Python Cmnd">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="python" code={pythonCmnd} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="pythonRequest" title="Python Request">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="python" code={pythonRequest} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="r" title="R" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="rHttr" title="R Httr">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="r" code={rHttr} />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="rCutl" title="R Cutl">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="r" code={rCutl} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
          <Tab key="rust" title="Rust" className="jost-bolder">
            <Card>
              <Tabs aria-label="Options1">
                <Tab key="rustReqwest" title="Reqwest">
                  <Card className="h-96">
                    <CardBody>
                      <CodeBlock language="rust" code={RustReqwest} />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </Card>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CodeSnippetPanel;
