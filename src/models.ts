export type TNestedRouteType = {
  path?: string;
  component: React.ReactNode;
  nestedRoute?: TNestedRouteType[];
};

export type TRoutes = {
  path: `/${string}`;
  component: React.ReactNode;
  condition?: boolean;
  nestedRoute?: TNestedRouteType[];
}[];
export type GetRoutesSignature = (routes: TNestedRouteType[], parentPath: string) => React.ReactNode;

export enum EStorage {
  'SESSION' = 'sessionStorage',
  'LOCAL' = 'localStorage',
  'ALL' = 'ALL'
}

export enum EStorageKeys {
  'BUDGET_APP_CREDS' = 'budget_app_creds',
  // 'USER_DETAILS' = 'user_details'
}