import React from 'react';
export interface AppRouting{
    path: string;
    component: React.FC;
    layout: boolean;
    requiresAuth: boolean;
    children: AppRouting[];
}