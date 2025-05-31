import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';
import '@testing-library/jest-dom/vitest';

describe('Contact Component', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  test('renders correctly', () => {
    expect(screen.getByLabelledBy('contact-title')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('お名前')).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('メッセージ')).toBeInTheDocument();
  });

  test('displays all social links', () => {
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.length).toBeGreaterThan(0);
    
    const expectedPlatforms = ['GitHub', 'X (Twitter)', 'Zenn', 'LAPRAS'];
    expectedPlatforms.forEach(platform => {
      expect(screen.getByText(platform)).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /送信する/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('必須項目を入力してください。')).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    const emailInput = screen.getByLabelText('メールアドレス');
    const submitButton = screen.getByRole('button', { name: /送信する/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('有効なメールアドレスを入力してください。')).toBeInTheDocument();
    });
  });

  test('submits form successfully', async () => {
    const mockFetch = vi.fn(() => 
      Promise.resolve({ ok: true })
    );
    global.fetch = mockFetch;

    const nameInput = screen.getByLabelText('お名前');
    const emailInput = screen.getByLabelText('メールアドレス');
    const messageInput = screen.getByLabelText('メッセージ');
    const submitButton = screen.getByRole('button', { name: /送信する/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('メッセージを送信しました。折り返しご連絡いたします。')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('handles submission error', async () => {
    const mockFetch = vi.fn(() => 
      Promise.resolve({ ok: false })
    );
    global.fetch = mockFetch;

    const nameInput = screen.getByLabelText('お名前');
    const emailInput = screen.getByLabelText('メールアドレス');
    const messageInput = screen.getByLabelText('メッセージ');
    const submitButton = screen.getByRole('button', { name: /送信する/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('送信に失敗しました。時間をおいて再度お試しください。')).toBeInTheDocument();
    });
  });
});
