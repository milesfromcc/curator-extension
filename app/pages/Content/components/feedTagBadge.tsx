export type FeedTagBadgeProps = {
  tag: FeedTag;
  // editMode?: boolean;
  onClick?: () => void;
};

export function FeedTagBadge({
  tag,
  // editMode = false,
  onClick = () => {},
}: FeedTagBadgeProps) {
  // const removeTag = (event: any) => {
  //     console.log('TODO: remove tag');
  //     event.stopPropagation();
  // };

  return (
    <CustomizedFeedBadgeBase
      variant={tag.color}
      className="gap-x-2 hover:cursor-pointer w-fit"
      onClick={() => {
        console.log('onClick top-level called (from feed badge base)');
        onClick();
      }}
    >
      {tag.name}
      {/* {editMode && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3"
                    onClick={onClick}
                >
                    <X onClick={removeTag} className="h-2 w-2" />
                </Button>
            )} */}
    </CustomizedFeedBadgeBase>
  );
}

/**
 * Everything below is a customized version of shadcn/ui Badge component.
 *
 * I ripped it from the file and just put it here since this is customized to our
 * feed tag needs.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Button } from './ui/button';
import { X } from 'lucide-react';
import { FeedTag } from '../../../entities/tags';
import { cn } from '../../../lib/utils';

const badgeVariants = cva(
  'border-transparent inline-flex items-center rounded-md border border-gray-200 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300',
  {
    variants: {
      variant: {
        black:
          'bg-gray-900 text-gray-50 shadow hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80',
        white:
          'bg-gray-50 text-gray-900 shadow hover:bg-gray-50/80 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-900/80',
        lightgray:
          'bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80',
        darkgray:
          'bg-gray-700 text-gray-50 hover:bg-gray-700/80 dark:bg-gray-700 dark:text-gray-50 dark:hover:bg-gray-700/80',
        red: 'bg-red-500 text-gray-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80',
      },
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CustomizedFeedBadgeBase({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
