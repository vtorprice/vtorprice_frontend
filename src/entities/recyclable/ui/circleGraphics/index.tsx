import React from 'react';
import ReactECharts from 'echarts-for-react';
import { IRecyclableCircleGraphics } from './types';

export const RecyclablesCircleGraphics: React.FC<IRecyclableCircleGraphics> = ({
  className,
  recyclables
}) => {
  const graphicsData = recyclables
    .sort((a, b) => a.monthlyVolume - b.monthlyVolume).map((recyclable) => ({
      name: recyclable.recyclables.name,
      value: recyclable.monthlyVolume
    }));

  return (
    <div className={className}>
      <ReactECharts option={{
        tooltip: {
          trigger: 'item',
          axisPointer: { type: 'cross' }
        },
        series: {
          type: 'pie',
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: graphicsData
        }
      }}
      />

    </div>
  );
};
