export type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
};
