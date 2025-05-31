import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkExperience from '../WorkExperience';
import '@testing-library/jest-dom/vitest';

describe('WorkExperience Component', () => {
  beforeEach(() => {
    render(<WorkExperience />);
  });

  test('renders correctly', () => {
    expect(screen.getByLabelledBy('experience-title')).toBeInTheDocument();
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
  });

  test('displays all work experiences', () => {
    const experiences = [
      'QAエンジニア',
      'テクニカルライター',
      'IT担当・データアナリスト',
      'テクニカルサポート'
    ];

    experiences.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('displays timeline items with correct structure', () => {
    const timeline = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    
    expect(timeline).toBeInTheDocument();
    expect(items.length).toBe(4);

    items.forEach(item => {
      expect(item).toHaveClass('timeline-item');
      expect(item.querySelector('.timeline-content')).toBeInTheDocument();
      expect(item.querySelector('.timeline-date')).toBeInTheDocument();
      expect(item.querySelector('.timeline-title')).toBeInTheDocument();
      expect(item.querySelector('.timeline-achievements')).toBeInTheDocument();
    });
  });

  test('displays achievements for each experience', () => {
    const items = screen.getAllByRole('listitem');
    
    items.forEach(item => {
      const achievements = item.querySelector('.timeline-achievements');
      expect(achievements.children.length).toBeGreaterThan(0);
    });
  });
});
