import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

describe('Hero', () => {
  it('renders title', () => {
    render(<Hero title="Test Title" />);
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<Hero title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const image = {
      src: '/test-image.jpg',
      width: 1200,
      height: 600,
      blurDataURL: 'data:image/jpeg;base64,test'
    };
    render(<Hero title="Test Title" image={image} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
