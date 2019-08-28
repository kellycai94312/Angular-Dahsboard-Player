import { FoldersEffect } from './folders.effects';
import { FiltersEffect } from './filters.effects';
import { LabelsEffect } from './labels.effects';

export const effects = [
    FoldersEffect,
    FiltersEffect,
    LabelsEffect
];

export * from './folders.effects';
export * from './filters.effects';
export * from './labels.effects';
