interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Checkout: { total: number; onPay?: () => void };
  Details: { product: Product };
  Success: undefined;
  Tabs: undefined | { screen: keyof BottomTabParamList; params?: any };
};
