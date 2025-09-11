import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '../auth'
import { mockApiClient, mockUser } from '@/test-utils'

// Mock the API client
jest.mock('@/lib/api', () => ({
  __esModule: true,
  default: mockApiClient,
}))

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useAuthStore.getState().logout()
    jest.clearAllMocks()
  })

  it('should have initial state', () => {
    const { result } = renderHook(() => useAuthStore())
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    }
    
    const mockResponse = {
      success: true,
      data: {
        user: mockUser,
        token: 'jwt-token'
      }
    }
    
    mockApiClient.login.mockResolvedValue(mockResponse)
    
    await act(async () => {
      await result.current.login(credentials)
    })
    
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(mockApiClient.login).toHaveBeenCalledWith(credentials)
  })

  it('should handle login error', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const credentials = {
      email: 'test@example.com',
      password: 'wrongpassword'
    }
    
    const error = new Error('Invalid credentials')
    mockApiClient.login.mockRejectedValue(error)
    
    await act(async () => {
      await result.current.login(credentials)
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('should register successfully', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const userData = {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
      user_type: 'INDIVIDUAL' as const
    }
    
    const mockResponse = {
      success: true,
      data: {
        user: { ...mockUser, ...userData },
        token: 'jwt-token'
      }
    }
    
    mockApiClient.register.mockResolvedValue(mockResponse)
    
    await act(async () => {
      await result.current.register(userData)
    })
    
    expect(result.current.user).toEqual({ ...mockUser, ...userData })
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(mockApiClient.register).toHaveBeenCalledWith(userData)
  })

  it('should handle register error', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const userData = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
      user_type: 'INDIVIDUAL' as const
    }
    
    const error = new Error('Email already exists')
    mockApiClient.register.mockRejectedValue(error)
    
    await act(async () => {
      await result.current.register(userData)
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('should logout successfully', () => {
    const { result } = renderHook(() => useAuthStore())
    
    // First login
    act(() => {
      result.current.setUser(mockUser)
    })
    
    expect(result.current.isAuthenticated).toBe(true)
    
    // Then logout
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should set loading state during login', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    }
    
    // Mock a delayed response
    let resolvePromise: (value: any) => void
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockApiClient.login.mockReturnValue(promise)
    
    // Start login
    act(() => {
      result.current.login(credentials)
    })
    
    // Check loading state
    expect(result.current.isLoading).toBe(true)
    
    // Resolve the promise
    await act(async () => {
      resolvePromise!({
        success: true,
        data: { user: mockUser, token: 'jwt-token' }
      })
    })
    
    expect(result.current.isLoading).toBe(false)
  })

  it('should set loading state during register', async () => {
    const { result } = renderHook(() => useAuthStore())
    
    const userData = {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
      user_type: 'INDIVIDUAL' as const
    }
    
    // Mock a delayed response
    let resolvePromise: (value: any) => void
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockApiClient.register.mockReturnValue(promise)
    
    // Start register
    act(() => {
      result.current.register(userData)
    })
    
    // Check loading state
    expect(result.current.isLoading).toBe(true)
    
    // Resolve the promise
    await act(async () => {
      resolvePromise!({
        success: true,
        data: { user: mockUser, token: 'jwt-token' }
      })
    })
    
    expect(result.current.isLoading).toBe(false)
  })

  it('should set user directly', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.setUser(mockUser)
    })
    
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should clear user', () => {
    const { result } = renderHook(() => useAuthStore())
    
    // First set user
    act(() => {
      result.current.setUser(mockUser)
    })
    
    expect(result.current.isAuthenticated).toBe(true)
    
    // Then clear user
    act(() => {
      result.current.clearUser()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
