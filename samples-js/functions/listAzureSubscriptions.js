const df = require("durable-functions");

df.app.orchestration("listAzureSubscriptions", function* (context) {
    // More information on the use of managed identities in the callHttp API:
    // https://docs.microsoft.com/azure/azure-functions/durable/durable-functions-http-features#managed-identities
    const res = yield context.df.callHttp({
        method: "GET",
        url: "https://management.azure.com/subscriptions?api-version=2019-06-01",
        tokenSource: new df.ManagedIdentityTokenSource("https://management.core.windows.net"),
    });
    return res;
});
