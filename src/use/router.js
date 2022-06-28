import router from "@/router/index.js"
export const useRouterNameToPage = (routeName) => router.push.bind(router, { name: routeName });
// () => router.push({ name: routeName })

export const useRouterPathToPage = (routePath) => router.push.bind(router, { path: routePath });

export const useRouterParamChange = (type) => (value) => {
  router.push({
    params: {
      [type]: value,
    },
  });
}

export const useRouterNameWithQueryToPage = (name, queryType) => query =>
  router.push({ name, query: { [queryType]: query } })