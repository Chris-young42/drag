"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Airplay, MoonIcon, SunIcon } from 'lucide-react'

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setmouted] = useState(false)
    useEffect(
        () => {
            setmouted(true)
        }, []
    )
    if (!mounted) return null
    return (
        <Tabs defaultValue={theme}>
            <TabsList className='border'>
                <TabsTrigger value='light' onClick={() => setTheme('light')}>
                    <SunIcon className='h-[1.2rem] w-[1.2rem]' />
                </TabsTrigger>
                <TabsTrigger value='dark' onClick={() => setTheme('dark')}>
                    <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0' />
                </TabsTrigger>
                <TabsTrigger value='system' onClick={() => setTheme('system')}>
                    <Airplay className='h-[1.2rem] w-[1.2rem]' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
