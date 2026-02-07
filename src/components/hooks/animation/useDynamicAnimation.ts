import { useMemo } from 'react';

interface AnimationConfig {
  staggerChildren: number;
  duration: number;
  enableStagger: boolean;
  enableItemAnimation: boolean;
}

interface DynamicAnimationOptions {
  itemCount: number;
  maxItemsForFullAnimation?: number;
  maxItemsForStagger?: number;
  minStaggerDelay?: number;
  maxStaggerDelay?: number;
}


export const useDynamicAnimation = ({
  itemCount,
  maxItemsForFullAnimation = 50,
  maxItemsForStagger = 100,
  minStaggerDelay = 0.01,
  maxStaggerDelay = 0.05,
}: DynamicAnimationOptions): AnimationConfig => {
  
  return useMemo(() => {
    // اگر تعداد آیتم‌ها خیلی کم است، انیمیشن کامل
    if (itemCount <= 20) {
      return {
        staggerChildren: maxStaggerDelay,
        duration: 0.3,
        enableStagger: true,
        enableItemAnimation: true,
      };
    }
    
    // اگر تعداد کم است، انیمیشن سریع‌تر
    if (itemCount <= maxItemsForFullAnimation) {
      return {
        staggerChildren: 0.02,
        duration: 0.2,
        enableStagger: true,
        enableItemAnimation: true,
      };
    }
    
    // اگر تعداد متوسط است، stagger خیلی کم
    if (itemCount <= maxItemsForStagger) {
      const staggerDelay = Math.max(
        minStaggerDelay,
        0.01 - ((itemCount - maxItemsForFullAnimation) / (maxItemsForStagger - maxItemsForFullAnimation)) * 0.008
      );
      
      return {
        staggerChildren: staggerDelay,
        duration: 0.15,
        enableStagger: true,
        enableItemAnimation: true,
      };
    }
    
    // اگر تعداد زیاد است، انیمیشن‌ها را غیرفعال کن
    return {
      staggerChildren: 0,
      duration: 0,
      enableStagger: false,
      enableItemAnimation: false,
    };
  }, [itemCount, maxItemsForFullAnimation, maxItemsForStagger, minStaggerDelay, maxStaggerDelay]);
};

/**
 * تولید variants برای container بر اساس تنظیمات داینامیک
 */
export const createDynamicContainerVariants = (config: AnimationConfig) => {
  if (!config.enableStagger) {
    return {
      open: {},
      closed: {},
    };
  }
  
  return {
    open: { 
      transition: { 
        staggerChildren: config.staggerChildren,
        duration: config.duration,
      } 
    },
    closed: {},
  };
};

/**
 * تولید variants برای آیتم‌ها بر اساس تنظیمات داینامیک
 */
export const createDynamicItemVariants = (config: AnimationConfig) => {
  if (!config.enableItemAnimation) {
    return {
      open: {},
      closed: {},
    };
  }
  
  return {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: config.duration }
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { duration: config.duration }
    },
  };
};