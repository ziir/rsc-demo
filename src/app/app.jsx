import { Suspense } from "react";

import { RscRefreshButton } from "./rsc-refresh-button";
import { Debug } from "./debug";
import { ClientDebug } from "./client-debug";
import { Header } from "./header";
import { StatusAlert } from "./status-alert";
import { Link } from "./link";
import { Loader } from "./loader";
import { Tabs } from "./tabs";
import { List } from "./list";
import { ClientList } from "./client-list";

import { ItemsContextProvider } from "./items";
import { RouterContextProvider } from "./router";

import { itemFixtures } from "../utils/fixtures";
import { logger } from "../utils/logger";

function Layout({ header, children }) {
  logger.debug("[app]", "rendering Layout server component");
  return (
    <div className="App">
      {header}
      <main className="App-main">{children}</main>
    </div>
  );
}

const emptyCallToAction = (
  <StatusAlert>
    No notes, yet.
    <br />
    <Link to="/new">Create a new note.</Link>
  </StatusAlert>
);

const appLoader = (
  <StatusAlert className="App-loader">
    <Loader />
  </StatusAlert>
);

export async function App(props) {
  logger.log("[app]", "rendering App server component");
  const { match } = props;

  const items = await new Promise((resolve) =>
    setTimeout(() => resolve(itemFixtures), 500),
  );
  logger.debug("[app]", "resolved items", { items });

  return (
    <Layout header={<Header />}>
      {
        <Suspense fallback={appLoader}>
          <ItemsContextProvider initialItems={items}>
            <RouterContextProvider>
              <section className="App-debug">
                <RscRefreshButton />
                <Debug {...props} title="RSC Debug" />
                <ClientDebug />
              </section>
              <section>
                <Tabs
                  tabs={[
                    {
                      id: "server",
                      label: "Server component",
                      content: (
                        <Suspense fallback={appLoader}>
                          <List
                            items={items}
                            activeItemId={match?.params?.id}
                            emptyCallToAction={emptyCallToAction}
                          />
                        </Suspense>
                      ),
                    },
                    {
                      id: "client",
                      label: "Client component",
                      content: (
                        <ClientList emptyCallToAction={emptyCallToAction} />
                      ),
                    },
                  ]}
                />
              </section>
            </RouterContextProvider>
          </ItemsContextProvider>
        </Suspense>
      }
    </Layout>
  );
}
