import { render } from '@testing-library/react';

// カスタムレンダー関数
export function renderWithContext(ui, options = {}) {
  return render(ui, {
    // プロバイダーやコンテキストが必要な場合はここに追加
    ...options,
  });
}

// イベントをモックする関数
export function mockIntersectionObserver() {
  const mock = jest.fn();
  mock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mock;
  return mock;
}

// アニメーション関連のモック
export function mockAnimation() {
  // Framer Motionのアニメーションをモック
  jest.mock('framer-motion', () => ({
    motion: {
      div: 'div',
      article: 'article',
    },
    AnimatePresence: ({ children }) => children,
  }));
}

// メディアクエリのモック
export function mockMatchMedia(matches) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// スクロールイベントのモック
export function mockScroll(scrollY = 0) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: scrollY,
  });
  window.dispatchEvent(new Event('scroll'));
}

// レスポンシブデザインのテスト用ビューポートサイズ
export const viewports = {
  mobile: { width: 320, height: 568 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
};
