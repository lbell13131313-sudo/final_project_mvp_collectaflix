import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MediaCard from '../MediaCard';
import { useWantlist } from '../../contexts/WantlistContext';
import { useCart } from '../../contexts/CartContext';

// mocks the context modules
vi.mock('../../contexts/WantlistContext', () => ({
  useWantlist: vi.fn(),
}));

vi.mock('../../contexts/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('MediaCard', () => {
  const mockMedia = {
    id: 101,
    title: 'Inception',
    poster_path: '/inception.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
    listing: {
      format: '4K Blu-ray',
      lowestPrice: 19.99,
      forSaleCount: 5,
    },
  };

  // Create reusable spy functions for context actions
  const mockAddToWantlist = vi.fn();
  const mockRemoveFromWantlist = vi.fn();
  const mockIsInWantlist = vi.fn();

  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockIsInCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    // Default context return values (item not in wantlist or cart)
    mockIsInWantlist.mockReturnValue(false);
    mockIsInCart.mockReturnValue(false);

    useWantlist.mockReturnValue({
      addToWantlist: mockAddToWantlist,
      removeFromWantlist: mockRemoveFromWantlist,
      isInWantlist: mockIsInWantlist,
    });

    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      isInCart: mockIsInCart,
    });
  });

  it('renders media details and listing info accurately', () => {
    render(<MediaCard media={mockMedia} />);

    expect(screen.getByRole('heading', { name: 'Inception' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Inception' })).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/inception.jpg'
    );
    expect(screen.getByText('⭐ 8.8')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText('Format: 4K Blu-ray')).toBeInTheDocument();
    expect(screen.getByText('Price: $19.99')).toBeInTheDocument();
    expect(screen.getByText('Available Copies: 5')).toBeInTheDocument();
  });

  it('falls back to TV show fields (name and first_air_date) when movie fields are missing', () => {
    const tvMedia = {
      ...mockMedia,
      title: undefined,
      release_date: undefined,
      name: 'Breaking Bad',
      first_air_date: '2008-01-20',
    };

    render(<MediaCard media={tvMedia} />);

    expect(screen.getByRole('heading', { name: 'Breaking Bad' })).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
  });

  describe('Collection (localStorage) behavior', () => {
    it('adds and removes media from localStorage when collection button is clicked', async () => {
      const user = userEvent.setup();
      render(<MediaCard media={mockMedia} />);

      const collectionBtn = screen.getByRole('button', { name: /add to collection/i });

      // Add to collection
      await user.click(collectionBtn);
      expect(screen.getByRole('button', { name: /remove from collection/i })).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('inCollection'))).toEqual([mockMedia]);

      // Remove from collection
      await user.click(screen.getByRole('button', { name: /remove from collection/i }));
      expect(screen.getByRole('button', { name: /add to collection/i })).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('inCollection'))).toEqual([]);
    });

    it('initializes as collected if media is already in localStorage', () => {
      localStorage.setItem('inCollection', JSON.stringify([mockMedia]));
      render(<MediaCard media={mockMedia} />);

      expect(screen.getByRole('button', { name: /remove from collection/i })).toBeInTheDocument();
    });

    it('renders ErrorMessage when localStorage throws an error', async () => {
      const user = userEvent.setup();
      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new Error('QuotaExceededError');
      });

      render(<MediaCard media={mockMedia} />);
      await user.click(screen.getByRole('button', { name: /add to collection/i }));

      expect(screen.getByText('Failed to update collection in localStorage.')).toBeInTheDocument();
    });
  });

  describe('Wantlist context interactions', () => {
    it('calls addToWantlist when item is not in wantlist', async () => {
      const user = userEvent.setup();
      render(<MediaCard media={mockMedia} />);

      await user.click(screen.getByRole('button', { name: /add to wantlist/i }));
      expect(mockAddToWantlist).toHaveBeenCalledWith(mockMedia);
    });

    it('calls removeFromWantlist when item is already in wantlist', async () => {
      const user = userEvent.setup();
      mockIsInWantlist.mockReturnValue(true);
      render(<MediaCard media={mockMedia} />);

      await user.click(screen.getByRole('button', { name: /remove from wantlist/i }));
      expect(mockRemoveFromWantlist).toHaveBeenCalledWith(mockMedia.id);
    });
  });

  describe('Cart context interactions', () => {
    it('calls addToCart when item is not in cart', async () => {
      const user = userEvent.setup();
      render(<MediaCard media={mockMedia} />);

      await user.click(screen.getByRole('button', { name: /add to cart/i }));
      expect(mockAddToCart).toHaveBeenCalledWith(mockMedia);
    });

    it('calls removeFromCart when item is already in cart', async () => {
      const user = userEvent.setup();
      mockIsInCart.mockReturnValue(true);
      render(<MediaCard media={mockMedia} />);

      await user.click(screen.getByRole('button', { name: /remove from cart/i }));
      expect(mockRemoveFromCart).toHaveBeenCalledWith(mockMedia.id);
    });
  });
});