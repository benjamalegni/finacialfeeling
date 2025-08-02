'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/database.types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Send, LogOut, User, BarChart3, Zap, Search, Star, TrendingUp, DollarSign, Bitcoin, Building2, X } from 'lucide-react'
import SimpleTypewriter from '@/components/simple-typewriter'
import { getRandomText } from '@/lib/texts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import SharedSidebar from '@/components/shared-sidebar'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [dynamicText, setDynamicText] = useState(getRandomText())
  const [dashboardColor, setDashboardColor] = useState('green')
  const [showAssetSelector, setShowAssetSelector] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [originalAssets, setOriginalAssets] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [analysisData, setAnalysisData] = useState<any>(null)

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  const router = useRouter()

  // Comprehensive list of financial assets
  const financialAssets = [
    // Stocks - Technology
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', category: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', category: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Stock', category: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', category: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Stock', category: 'Technology' },
    { symbol: 'META', name: 'Meta Platforms', type: 'Stock', category: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock', category: 'Technology' },
    { symbol: 'NFLX', name: 'Netflix Inc.', type: 'Stock', category: 'Technology' },
    
    // Stocks - Finance
    { symbol: 'JPM', name: 'JPMorgan Chase', type: 'Stock', category: 'Finance' },
    { symbol: 'BAC', name: 'Bank of America', type: 'Stock', category: 'Finance' },
    { symbol: 'WFC', name: 'Wells Fargo', type: 'Stock', category: 'Finance' },
    { symbol: 'GS', name: 'Goldman Sachs', type: 'Stock', category: 'Finance' },
    
    // Stocks - Healthcare
    { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'Stock', category: 'Healthcare' },
    { symbol: 'PFE', name: 'Pfizer Inc.', type: 'Stock', category: 'Healthcare' },
    { symbol: 'UNH', name: 'UnitedHealth Group', type: 'Stock', category: 'Healthcare' },
    { symbol: 'ABBV', name: 'AbbVie Inc.', type: 'Stock', category: 'Healthcare' },
    
    // Stocks - Energy
    { symbol: 'XOM', name: 'Exxon Mobil', type: 'Stock', category: 'Energy' },
    { symbol: 'CVX', name: 'Chevron Corporation', type: 'Stock', category: 'Energy' },
    { symbol: 'COP', name: 'ConocoPhillips', type: 'Stock', category: 'Energy' },
    
    // Cryptocurrencies
    { symbol: 'BTC', name: 'Bitcoin', type: 'Crypto', category: 'Cryptocurrency' },
    { symbol: 'ETH', name: 'Ethereum', type: 'Crypto', category: 'Cryptocurrency' },
    { symbol: 'BNB', name: 'Binance Coin', type: 'Crypto', category: 'Cryptocurrency' },
    { symbol: 'ADA', name: 'Cardano', type: 'Crypto', category: 'Cryptocurrency' },
    { symbol: 'SOL', name: 'Solana', type: 'Crypto', category: 'Cryptocurrency' },
    { symbol: 'DOT', name: 'Polkadot', type: 'Crypto', category: 'Cryptocurrency' },
    
    // ETFs
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', type: 'ETF', category: 'Index' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', category: 'Technology' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', type: 'ETF', category: 'Index' },
    { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets ETF', type: 'ETF', category: 'International' },
    { symbol: 'VWO', name: 'Vanguard FTSE Emerging Markets ETF', type: 'ETF', category: 'International' },
    { symbol: 'GLD', name: 'SPDR Gold Shares', type: 'ETF', category: 'Commodity' },
    { symbol: 'SLV', name: 'iShares Silver Trust', type: 'ETF', category: 'Commodity' },
    
    // Commodities
    { symbol: 'GC', name: 'Gold Futures', type: 'Commodity', category: 'Precious Metals' },
    { symbol: 'SI', name: 'Silver Futures', type: 'Commodity', category: 'Precious Metals' },
    { symbol: 'CL', name: 'Crude Oil Futures', type: 'Commodity', category: 'Energy' },
    { symbol: 'NG', name: 'Natural Gas Futures', type: 'Commodity', category: 'Energy' },
    
    // Forex
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', type: 'Forex', category: 'Currency' },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', type: 'Forex', category: 'Currency' },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', type: 'Forex', category: 'Currency' },
    { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', type: 'Forex', category: 'Currency' },
    { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', type: 'Forex', category: 'Currency' },
  ]
  
  // Create Supabase client with fallback for build time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  const supabase = createBrowserClient<Database>(supabaseUrl, supabaseKey)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase.auth])

  // Change text every 8 seconds when user is not logged in
  useEffect(() => {
    if (user) return // Don't change text if user is logged in

    const interval = setInterval(() => {
      setDynamicText(getRandomText())
    }, 8000)

    return () => clearInterval(interval)
  }, [user])

  // Change dashboard color randomly
  useEffect(() => {
    const colors = ['green', 'yellow', 'red']
    const interval = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setDashboardColor(randomColor)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  const handleSendMessage = () => {
    if (!user) {
      // Si no está autenticado, redirigir al login
      router.push('/login')
      return
    }
    
    if (message.trim()) {
      // Procesar múltiples assets separados por comas
      const assets = message.split(',').map(asset => asset.trim().toUpperCase()).filter(asset => asset.length > 0)
      
      if (assets.length > 0) {
        // Verificar que los assets existen en nuestra lista
        const validAssets = assets.filter(asset => 
          financialAssets.some(fa => fa.symbol === asset)
        )
        
        if (validAssets.length > 0) {
          // Agregar los assets válidos al portafolio
          const newAssets = [...selectedAssets]
          validAssets.forEach(asset => {
            if (!newAssets.includes(asset)) {
              newAssets.push(asset)
            }
          })
          setSelectedAssets(newAssets)
          
          // Mostrar mensaje de confirmación
          console.log(`Added ${validAssets.length} assets to portfolio:`, validAssets)
          
          // Limpiar el input
          setMessage('')
          
          // Guardar automáticamente los assets en el portafolio
          savePortfolioFromChat(newAssets)
          
          // Opcional: Abrir el modal de selección de assets para mostrar los cambios
          setShowAssetSelector(true)
        } else {
          console.log('No valid assets found in the message')
        }
      }
    }
  }

  // Filter assets based on search term
  const filteredAssets = financialAssets.filter(asset => {
    const searchLower = searchTerm.toLowerCase()
    return (
      asset.symbol.toLowerCase().includes(searchLower) ||
      asset.name.toLowerCase().includes(searchLower) ||
      asset.category.toLowerCase().includes(searchLower)
    )
  })

  // Autocomplete function
  const getAutocompleteSuggestions = (input: string) => {
    if (!input.trim()) return []
    
    const inputLower = input.toLowerCase()
    return financialAssets.filter(asset => 
      asset.symbol.toLowerCase().includes(inputLower) ||
      asset.name.toLowerCase().includes(inputLower)
    ).slice(0, 5) // Limit to 5 suggestions
  }

  // Handle autocomplete selection
  const handleAutocompleteSelect = (asset: any) => {
    setMessage(asset.symbol)
    setShowAutocomplete(false)
    setSelectedSuggestionIndex(-1)
  }

  // Handle input change with autocomplete
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMessage(value)
    
    if (user && value.trim()) {
      const suggestions = getAutocompleteSuggestions(value)
      setAutocompleteSuggestions(suggestions)
      setShowAutocomplete(suggestions.length > 0)
      setSelectedSuggestionIndex(-1)
    } else {
      setShowAutocomplete(false)
      setAutocompleteSuggestions([])
    }
  }

  // Handle keyboard navigation for autocomplete
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showAutocomplete && selectedSuggestionIndex >= 0) {
        e.preventDefault()
        handleAutocompleteSelect(autocompleteSuggestions[selectedSuggestionIndex])
      } else {
        handleSendMessage()
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (showAutocomplete) {
        setSelectedSuggestionIndex(prev => 
          prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
        )
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (showAutocomplete) {
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false)
      setSelectedSuggestionIndex(-1)
    }
  }

  // Handle click outside to close autocomplete
  useEffect(() => {
    const handleClickOutside = () => {
      setShowAutocomplete(false)
      setSelectedSuggestionIndex(-1)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleAssetSelection = (symbol: string) => {
    if (selectedAssets.includes(symbol)) {
      setSelectedAssets(selectedAssets.filter(asset => asset !== symbol))
    } else {
      setSelectedAssets([...selectedAssets, symbol])
    }
  }

  const savePortfolio = async () => {
    if (!user || selectedAssets.length === 0) return

    try {
      // Save selected assets to Supabase
      const { data, error } = await supabase
        .from('user_selected_assets')
        .upsert(
          selectedAssets.map(symbol => {
            const asset = financialAssets.find(a => a.symbol === symbol)
            return {
              user_id: user.id,
              asset_identifier: symbol,
              asset_type: asset?.type || null,
              asset_name: asset?.name || null,
              selected_at: new Date().toISOString()
            }
          }),
          { onConflict: 'user_id,asset_identifier' }
        )

      if (error) {
        console.error('Error saving portfolio:', error)
        alert('Error saving portfolio. Please try again.')
        return
      }

      console.log('Portfolio saved successfully:', data)
      setOriginalAssets(selectedAssets) // Actualizar los activos originales
      setShowAssetSelector(false)
      setSelectedAssets([]) // Clear selection after saving
    } catch (error) {
      console.error('Error saving portfolio:', error)
      alert('Error saving portfolio. Please try again.')
    }
  }

  const savePortfolioFromChat = async (assets: string[]) => {
    if (!user || assets.length === 0) return

    try {
      // Save assets to Supabase
      const { data, error } = await supabase
        .from('user_selected_assets')
        .upsert(
          assets.map(symbol => {
            const asset = financialAssets.find(a => a.symbol === symbol)
            return {
              user_id: user.id,
              asset_identifier: symbol,
              asset_type: asset?.type || null,
              asset_name: asset?.name || null,
              selected_at: new Date().toISOString()
            }
          }),
          { onConflict: 'user_id,asset_identifier' }
        )

      if (error) {
        console.error('Error saving portfolio from chat:', error)
        return
      }

      console.log('Portfolio saved from chat successfully:', data)
      setOriginalAssets(assets) // Actualizar los activos originales
    } catch (error) {
      console.error('Error saving portfolio from chat:', error)
    }
  }

  const loadUserAssets = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_selected_assets')
        .select('asset_identifier')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading user assets:', error)
        return
      }

      const userAssetSymbols = data.map((item: { asset_identifier: string }) => item.asset_identifier)
      setSelectedAssets(userAssetSymbols)
      setOriginalAssets(userAssetSymbols) // Guardar los activos originales
      
      // Si hay assets cargados, limpiar el análisis anterior
      if (userAssetSymbols.length > 0) {
        setAnalysisData(null)
      }
    } catch (error) {
      console.error('Error loading user assets:', error)
    }
  }

  const hasPortfolioChanges = () => {
    if (originalAssets.length !== selectedAssets.length) return true
    
    const sortedOriginal = [...originalAssets].sort()
    const sortedSelected = [...selectedAssets].sort()
    
    return !sortedOriginal.every((asset, index) => asset === sortedSelected[index])
  }

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
    console.log('Análisis actualizado automáticamente:', data);
  }

  const handleOpenAssetSelector = () => {
    setShowAssetSelector(true)
    loadUserAssets() // Load existing assets when opening
  }

  const getDashboardColorClasses = () => {
    switch (dashboardColor) {
      case 'green':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
      case 'yellow':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600'
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

      return (
      <div className="min-h-screen text-white relative">
        {/* Gradiente fijo oscuro violeta y azul */}
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 via-indigo-900 to-black"></div>
        <div className="relative z-10">
          {/* Dashboard Button - Top Left */}
          <div className="fixed top-4 left-4 z-50">
            <div className="flex flex-col items-center space-y-2">
              {/* FF superpuestas como en SharedSidebar */}
              <div className="relative">
                <div className="text-white text-xl font-bold">FF</div>
                <div className="absolute top-0 right-0.5 text-white text-xl font-bold">FF</div>
              </div>
              {user ? (
                <Button
                  size="icon"
                  className={`text-white transition-all duration-500 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600 ${getDashboardColorClasses()}`}
                  onClick={() => router.push('/dashboard')}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="relative group">
                  <Button
                    size="icon"
                    className={`text-white transition-all duration-500 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600 cursor-not-allowed ${getDashboardColorClasses()}`}
                    disabled
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Login to access Dashboard
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shared Sidebar */}
          <SharedSidebar 
            selectedAssets={selectedAssets}
            onAnalysisComplete={handleAnalysisComplete}
          />

          {/* Main Content */}
          <div className="ml-16 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header with Auth */}
              <div className="flex justify-between items-center mb-8">
                <div></div>
                <div>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-800 transition-colors">
                          <Avatar className="h-8 w-8 shadow-md bg-white text-black">
                            <AvatarImage src="/avatars/01.png" alt={user.email} />
                            <AvatarFallback className="bg-white text-black">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80 bg-gray-900 border-gray-700 shadow-xl" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none text-white">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="space-x-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => router.push('/login')}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        Login to FF
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">
                  {user ? (
                    `Welcome back, ${user.email}!`
                  ) : (
                    <SimpleTypewriter 
                      text={dynamicText} 
                      speed={80} 
                      delay={500}
                      className="text-4xl font-black"
                    />
                  )}
                </h1>
                {user && <p className="text-gray-400 mb-8">Ready to dive into your next trading opportunity?</p>}

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="relative bg-gray-900 rounded-lg border border-gray-700 p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-1">
                        <Input
                          value={message}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          placeholder={
                            user
                              ? "Type asset symbols (e.g., AAPL, TSLA, MSFT) or click + button..."
                              : "Type to start selecting assets with Financial Feeling (sign in to send messages)"
                          }
                          className="bg-transparent border-none text-white placeholder-gray-400 focus-visible:ring-0"
                        />
                        
                        {/* Autocomplete Dropdown */}
                        {showAutocomplete && user && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                            {autocompleteSuggestions.map((asset, index) => (
                              <div
                                key={asset.symbol}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors ${
                                  index === selectedSuggestionIndex ? 'bg-gray-700' : ''
                                }`}
                                onClick={() => handleAutocompleteSelect(asset)}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-white font-semibold">{asset.symbol}</div>
                                    <div className="text-gray-400 text-sm">{asset.name}</div>
                                  </div>
                                  <div className="text-gray-500 text-xs">{asset.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Show + button for both logged in and not logged in users */}
                        <Dialog open={showAssetSelector} onOpenChange={setShowAssetSelector}>
                          <DialogTrigger asChild>
                            <Button
                              size="icon"
                              className={`shadow-md transition-colors ${
                                user 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-gray-600 hover:bg-gray-700'
                              }`}
                              onClick={user ? handleOpenAssetSelector : () => router.push('/login')}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {user && (
                            <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-hidden">
                              <DialogHeader className="relative">
                                <DialogTitle className="text-white flex items-center gap-2">
                                  <Star className="h-5 w-5" />
                                  Select Financial Assets for Your Portfolio
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Choose from a wide range of stocks, cryptocurrencies, ETFs, commodities, and forex pairs.
                                </DialogDescription>
                                
                                {/* Save & Close Button - Top Right */}
                                <div className="absolute top-0 right-0">
                                  <Button
                                    onClick={savePortfolio}
                                    disabled={selectedAssets.length === 0}
                                    className="bg-black hover:bg-gray-800 text-white"
                                  >
                                    {hasPortfolioChanges() ? `Save & Close (${selectedAssets.length} assets)` : 'Close'}
                                  </Button>
                                </div>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                {/* Search */}
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <Input
                                    placeholder="Search assets by symbol, name, or category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                                  />
                                </div>

                                {/* Asset Categories */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {['All', 'Technology', 'Finance', 'Healthcare', 'Energy', 'Cryptocurrency', 'Index', 'International', 'Commodity', 'Currency'].map(category => (
                                    <Badge
                                      key={category}
                                      variant={searchTerm === category ? "default" : "secondary"}
                                      className="cursor-pointer hover:bg-blue-600"
                                      onClick={() => setSearchTerm(category === 'All' ? '' : category)}
                                    >
                                      {category}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Assets Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                                  {filteredAssets.map((asset) => (
                                    <div
                                      key={asset.symbol}
                                      className={`p-3 rounded-lg border cursor-pointer transition-all relative ${
                                        selectedAssets.includes(asset.symbol)
                                          ? 'bg-blue-600 border-blue-500 text-white'
                                          : 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300'
                                      }`}
                                      onClick={() => handleAssetSelection(asset.symbol)}
                                    >
                                      <div className="text-center">
                                        <div className="font-semibold text-lg mb-1">{asset.symbol}</div>
                                        <div className="text-xs opacity-75 mb-1">{asset.name}</div>
                                        <div className="text-xs opacity-75">{asset.type}</div>
                                      </div>
                                      
                                      {/* Checkmark for selected assets */}
                                      {selectedAssets.includes(asset.symbol) && (
                                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                          <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>

                                {/* Selected Assets */}
                                {selectedAssets.length > 0 && (
                                  <div className="border-t border-gray-700 pt-4">
                                    <h4 className="text-white font-semibold mb-2">Selected Assets ({selectedAssets.length}) - Click to remove</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedAssets.map(symbol => {
                                        const asset = financialAssets.find(a => a.symbol === symbol)
                                        return (
                                          <Badge 
                                            key={symbol} 
                                            className="bg-blue-600 hover:bg-red-600 cursor-pointer transition-colors flex items-center gap-1"
                                            onClick={() => handleAssetSelection(symbol)}
                                          >
                                            {symbol}
                                            <X className="h-3 w-3 hover:text-red-200" />
                                          </Badge>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Cancel Button */}
                                <div className="flex justify-end pt-4 border-t border-gray-700">
                                  <Button
                                    variant="outline"
                                    onClick={() => setShowAssetSelector(false)}
                                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-black"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          )}
                        </Dialog>
                        
                        <Button 
                          size="icon" 
                          className="bg-blue-600 hover:bg-blue-700 shadow-md transition-colors" 
                          onClick={handleSendMessage}
                          disabled={!user || !message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {!user && (
                    <p className="text-gray-500 text-sm mt-2">
                      <Button
                        variant="link"
                        onClick={() => router.push('/login')}
                        className="text-blue-400 hover:text-blue-300 p-0"
                      >
                        Sign in
                      </Button>{" "}
                      to start collaborating with Financial Feeling
                    </p>
                  )}
                </div>
              </div>

              {/* AI Analysis Results */}
              {analysisData && user && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6 text-center text-white">AI Sentiment Analysis Results</h2>
                  <Card className="bg-gray-900 border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {analysisData.data?.stocks?.map((stock: any, index: number) => (
                          <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
                              <Badge className={`${
                                stock.analysis.sentiment === 'positive' ? 'bg-green-600' :
                                stock.analysis.sentiment === 'negative' ? 'bg-red-600' : 'bg-yellow-600'
                              }`}>
                                {stock.analysis.sentiment}
                              </Badge>
                            </div>
                            <p className="text-gray-300 mb-2">{stock.analysis.recommendation}</p>
                            <p className="text-sm text-gray-400">Confidence: {stock.analysis.confidence}%</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* How to Use Section */}
              <div className="mb-8">
                <h2 className="text-6xl font-bold mb-6 text-center" style={{fontFamily: 'Newsreader, serif', fontWeight: 800}}>Learn to Use Stock Analysis</h2>

                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-8">
                    <div className="relative h-64 overflow-hidden">
                      {/* Carrusel de pasos */}
                      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentStep * 100}%)` }}>
                        {/* Paso 1 */}
                        <div className="w-full flex-shrink-0 flex items-center justify-center">
                          <div className="text-center max-w-md">
                            <div className="text-6xl font-bold text-blue-500 mb-4">1</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Enter Stock Symbols</h3>
                            <p className="text-gray-300 text-lg">
                              Type the stock symbols you want to analyze, separated by commas.
                              <br />
                              <span className="text-blue-400 font-semibold">Example: AAPL, TSLA, MSFT, GOOGL</span>
                            </p>
                          </div>
                        </div>

                        {/* Paso 2 */}
                        <div className="w-full flex-shrink-0 flex items-center justify-center">
                          <div className="text-center max-w-md">
                            <div className="text-6xl font-bold text-green-500 mb-4">2</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Get AI Analysis</h3>
                            <p className="text-gray-300 text-lg">
                              Our AI will analyze market data, trends, and provide trading recommendations
                              with confidence scores for each stock.
                            </p>
                          </div>
                        </div>

                        {/* Paso 3 */}
                        <div className="w-full flex-shrink-0 flex items-center justify-center">
                          <div className="text-center max-w-md">
                            <div className="text-6xl font-bold text-yellow-500 mb-4">3</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Review Results</h3>
                            <p className="text-gray-300 text-lg">
                              View detailed analysis including price changes, recommendations,
                              and confidence levels for informed decision making.
                            </p>
                          </div>
                        </div>

                        {/* Paso 4 */}
                        <div className="w-full flex-shrink-0 flex items-center justify-center">
                          <div className="text-center max-w-md">
                            <div className="text-6xl font-bold text-purple-500 mb-4">4</div>
                            <h3 className="text-2xl font-bold text-white mb-4">A good company with bad news is a BUY</h3>
                            <p className="text-gray-300 text-lg">
                              Use the insights to make informed trading decisions based on
                              AI-powered analysis and market trends.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Controles del carrusel */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {[0, 1, 2, 3].map((step) => (
                          <button
                            key={step}
                            onClick={() => setCurrentStep(step)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                              currentStep === step ? 'bg-white' : 'bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Botones de navegación */}
                      <button
                        onClick={() => setCurrentStep((prev) => (prev === 0 ? 3 : prev - 1))}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                      >
                        →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stock Analysis Section */}
              {user && (
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-2">AI-Powered Stock Analysis</h2>
                    <p className="text-gray-400">Get real-time stock analysis with AI recommendations</p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push('/stock-analysis')}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
                    >
                      Analyze Stocks
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }