const INLINE_FLIGHT_PAYLOAD_BOOTSTRAP = 0;
const INLINE_FLIGHT_PAYLOAD_DATA = 1;
const INLINE_FLIGHT_PAYLOAD_FORM_STATE = 2;

function createFlightTransformer(nonce, formState) {
  const startScriptTag = nonce
    ? `<script nonce=${JSON.stringify(nonce)}>`
    : "<script>";

  return (
    new TransformStream() < string,
    string >
      {
        // Bootstrap the flight information.
        start(controller) {
          controller.enqueue(
            `${startScriptTag}(self.__next_f=self.__next_f||[]).push(${htmlEscapeJsonString(
              JSON.stringify([INLINE_FLIGHT_PAYLOAD_BOOTSTRAP])
            )});self.__next_f.push(${htmlEscapeJsonString(
              JSON.stringify([INLINE_FLIGHT_PAYLOAD_FORM_STATE, formState])
            )})</script>`
          );
        },
        transform(chunk, controller) {
          const scripts = `${startScriptTag}self.__next_f.push(${htmlEscapeJsonString(
            JSON.stringify([INLINE_FLIGHT_PAYLOAD_DATA, chunk])
          )})</script>`;

          controller.enqueue(scripts);
        },
      }
  );
}

/**
 * Render Flight stream.
 * This is only used for renderToHTML, the Flight response does not need additional wrappers.
 */
function useFlightResponse(
  writable,
  flightStream,
  clientReferenceManifest,
  flightResponseRef,
  formState,
  nonce
) {
  if (flightResponseRef.current !== null) {
    return flightResponseRef.current;
  }
  // react-server-dom-webpack/client.edge must not be hoisted for require cache clearing to work correctly
  let createFromReadableStream =
    // eslint-disable-next-line import/no-extraneous-dependencies
    require("react-server-dom-webpack/client.edge").createFromReadableStream;

  const [renderStream, forwardStream] = flightStream.tee();
  const res = createFromReadableStream(renderStream, {
    ssrManifest: {
      moduleLoading: clientReferenceManifest.moduleLoading,
      moduleMap: isEdgeRuntime
        ? clientReferenceManifest.edgeSSRModuleMapping
        : clientReferenceManifest.ssrModuleMapping,
    },
    nonce,
  });
  flightResponseRef.current = res;

  forwardStream
    .pipeThrough(createDecodeTransformStream())
    .pipeThrough(createFlightTransformer(nonce, formState))
    .pipeThrough(createEncodeTransformStream())
    .pipeTo(writable)
    .finally(() => {
      // Once the last encoding stream has flushed, then unset the flight
      // response ref.
      flightResponseRef.current = null;
    })
    .catch((err) => {
      console.error("Unexpected error while rendering Flight stream", err);
    });

  return res;
}

module.exports = { useFlightResponse };
