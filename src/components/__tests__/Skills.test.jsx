import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import '@testing-library/jest-dom';

describe('Skills Component', () => {
  beforeEach(() => {
    render(<Skills />);
  });
  
  test('renders correctly', () => {
    expect(screen.getByText('スキル')).toBeInTheDocument();
  });

  test('displays all skill categories', () => {
    expect(screen.getByText('ドキュメント・コミュニケーション')).toBeInTheDocument();
    expect(screen.getByText('技術スキル')).toBeInTheDocument();
    expect(screen.getByText('分析・品質保証')).toBeInTheDocument();
    expect(screen.getByText('プロジェクト管理')).toBeInTheDocument();
  });

  test('displays skills in each category', () => {
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(4);
    
    lists.forEach(list => {
      expect(list.children.length).toBeGreaterThan(0);
    });
  });
});