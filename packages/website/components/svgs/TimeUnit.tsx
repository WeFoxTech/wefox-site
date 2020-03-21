// https://upload.wikimedia.org/wikipedia/commons/3/33/Gregorian_year_visualisation.svg

import React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-330 -25 1440 960" {...props}>
      <defs>
        <g id="prefix__g">
          <path d="M0 1l1-.5v-1l-.75-.75-1 .5v1z" stroke="#000" />
          <path d="M0 0l-.75-.75v1L0 1z" fillOpacity={0.25} />
          <path d="M0 0v1l1-.5v-1z" fillOpacity={0.5} />
        </g>
        <g id="prefix__a">
          <path d="M0 1l1-.5v-1l-45-45-1 .5v1z" stroke="#000" />
          <path d="M0 0l-45-45v1L0 1z" fillOpacity={0.25} />
          <path d="M0 0v1l1-.5v-1z" fillOpacity={0.5} />
        </g>
        <g id="prefix__e">
          <path d="M0 1l60-30v-1L15-75l-60 30v1z" stroke="#000" />
          <path d="M0 0l-45-45v1L0 1z" fillOpacity={0.25} />
          <path d="M0 0v1l60-30v-1z" fillOpacity={0.5} />
        </g>
        <g id="prefix__d">
          <path d="M0 24L60-6v-24L15-75l-60 30v24z" stroke="#000" />
          <path d="M0 0l-45-45v24L0 24z" fillOpacity={0.25} />
          <path d="M0 0v24L60-6v-24z" fillOpacity={0.5} />
        </g>
        <g id="prefix__h">
          <path d="M0 24L60-6v-24l-315-315-60 30v24z" stroke="#000" />
          <path d="M0 0l-315-315v24L0 24z" fillOpacity={0.25} />
          <path d="M0 0v24L60-6v-24z" fillOpacity={0.5} />
        </g>
        <g id="prefix__c">
          <path d="M0 24l300-150v-24l-90-90-60 30-225-225-240 120v24z" stroke="#000" />
          <path d="M0 0l-315-315v24L0 24z" fillOpacity={0.25} />
          <path d="M0 0v24l300-150v-24z" fillOpacity={0.5} />
        </g>
        <g id="prefix__b">
          <use xlinkHref="#prefix__a" transform="translate(36 -18)" />
          <use xlinkHref="#prefix__a" transform="translate(32 -16)" />
          <use xlinkHref="#prefix__a" transform="translate(28 -14)" />
          <use xlinkHref="#prefix__a" transform="translate(24 -12)" />
          <use xlinkHref="#prefix__a" transform="translate(20 -10)" />
          <use xlinkHref="#prefix__a" transform="translate(16 -8)" />
          <use xlinkHref="#prefix__a" transform="translate(12 -6)" />
          <use xlinkHref="#prefix__a" transform="translate(8 -4)" />
          <use xlinkHref="#prefix__a" transform="translate(4 -2)" />
        </g>
        <g id="prefix__f">
          <use xlinkHref="#prefix__b" />
          <use xlinkHref="#prefix__a" />
        </g>
        <g
          id="prefix__i"
          fontFamily="Arial,Helvetica,sans-serif"
          fontSize={48}
          textAnchor="start"
          stroke="none"
          strokeWidth={1}
          strokeLinejoin="round"
        >
          <g transform="translate(790 640)" fill="#fc0">
            <use xlinkHref="#prefix__c" transform="translate(0 264)" />
            <use xlinkHref="#prefix__c" transform="translate(0 240)" />
            <use xlinkHref="#prefix__c" transform="translate(0 216)" />
            <use xlinkHref="#prefix__c" transform="translate(0 192)" />
            <use xlinkHref="#prefix__c" transform="translate(0 168)" />
            <use xlinkHref="#prefix__c" transform="translate(0 144)" />
            <use xlinkHref="#prefix__c" transform="translate(0 120)" />
            <use xlinkHref="#prefix__c" transform="translate(0 96)" />
            <use xlinkHref="#prefix__c" transform="translate(0 72)" />
            <use xlinkHref="#prefix__c" transform="translate(0 48)" />
            <use xlinkHref="#prefix__c" transform="translate(0 24)" />
            <use xlinkHref="#prefix__c" />
            <use xlinkHref="#prefix__d" transform="translate(-130 -349)" />
            <use xlinkHref="#prefix__d" transform="translate(-85 -304)" />
            <use xlinkHref="#prefix__d" transform="translate(-40 -259)" />
            <use xlinkHref="#prefix__d" transform="translate(5 -214)" />
            <use xlinkHref="#prefix__d" transform="translate(50 -169)" />
            <use xlinkHref="#prefix__e" transform="translate(-230 -276)" />
            <use xlinkHref="#prefix__e" transform="translate(-185 -231)" />
            <use xlinkHref="#prefix__e" transform="translate(-140 -186)" />
            <use xlinkHref="#prefix__e" transform="translate(-95 -141)" />
            <use xlinkHref="#prefix__e" transform="translate(-50 -96)" />
            <use xlinkHref="#prefix__f" transform="translate(228 -148)" />
            <use xlinkHref="#prefix__f" transform="translate(178 -123)" />
            <use xlinkHref="#prefix__f" transform="translate(128 -98)" />
            <use xlinkHref="#prefix__f" transform="translate(78 -73)" />
            <use xlinkHref="#prefix__b" transform="translate(28 -48)" />
            <use xlinkHref="#prefix__g" transform="translate(-30 -85)" />
            <use xlinkHref="#prefix__g" transform="translate(-25 -80)" />
            <use xlinkHref="#prefix__g" transform="translate(-20 -75)" />
            <use xlinkHref="#prefix__g" transform="translate(-15 -70)" />
            <use xlinkHref="#prefix__g" transform="translate(-10 -65)" />
            <use xlinkHref="#prefix__g" transform="translate(-5 -60)" />
            <use xlinkHref="#prefix__g" transform="translate(0 -55)" />
            <use xlinkHref="#prefix__g" transform="translate(5 -50)" />
            <use xlinkHref="#prefix__g" transform="translate(10 -45)" />
            <use xlinkHref="#prefix__g" transform="translate(15 -40)" />
            <use xlinkHref="#prefix__g" transform="translate(3 -41)" />
            <use xlinkHref="#prefix__g" transform="translate(8 -36)" />
            <text x={-320} y={-625} fill="#000">
              <tspan>{'1 Gregorian year'}</tspan>
              <tspan x={-280} dy={50}>
                {'= 365 days, 5 hours,'}
              </tspan>
              <tspan x={-240} dy={40}>
                {'49 minutes &amp;'}
              </tspan>
              <tspan x={-240} dy={40}>
                {'12 seconds'}
              </tspan>
              <tspan x={-280} dy={50}>
                {'= 31 556 952 s'}
              </tspan>
            </text>
          </g>
          <g transform="translate(0 905)" fill="#c9f">
            <use xlinkHref="#prefix__d" transform="translate(195 -165)" />
            <use xlinkHref="#prefix__d" transform="translate(240 -120)" />
            <use xlinkHref="#prefix__h" transform="translate(180 -90)" />
            <use xlinkHref="#prefix__h" transform="translate(120 -60)" />
            <use xlinkHref="#prefix__h" transform="translate(60 -30)" />
            <use xlinkHref="#prefix__h" />
            <text x={80} y={-365} fill="#000">
              <tspan>{'1 30-day month'}</tspan>
              <tspan x={120} dy={40}>
                {'= 4 weeks &amp;'}
              </tspan>
              <tspan x={160} dy={35}>
                {'2 days'}
              </tspan>
              <tspan x={120} dy={45}>
                {'= 2 592 000 s'}
              </tspan>
            </text>
          </g>
          <g transform="translate(0 470)" fill="#69f">
            <use xlinkHref="#prefix__d" transform="translate(-270 -270)" />
            <use xlinkHref="#prefix__d" transform="translate(-225 -225)" />
            <use xlinkHref="#prefix__d" transform="translate(-180 -180)" />
            <use xlinkHref="#prefix__d" transform="translate(-135 -135)" />
            <use xlinkHref="#prefix__d" transform="translate(-90 -90)" />
            <use xlinkHref="#prefix__d" transform="translate(-45 -45)" />
            <use xlinkHref="#prefix__d" />
            <text x={80} y={-60} fill="#000">
              <tspan>{'1 week'}</tspan>
              <tspan x={120} dy={40}>
                {'= 7 days'}
              </tspan>
              <tspan x={120} dy={45}>
                {'= 604 800 s'}
              </tspan>
            </text>
          </g>
          <g transform="translate(0 310)" fill="#0c0">
            <use xlinkHref="#prefix__d" />
            <text x={80} y={-30} fill="#000">
              <tspan>{'1 day'}</tspan>
              <tspan x={120} dy={45}>
                {'= 24 hours'}
              </tspan>
              <tspan x={120} dy={40}>
                {'= 86 400 s'}
              </tspan>
            </text>
          </g>
          <g transform="translate(0 200)" fill="red">
            <use xlinkHref="#prefix__e" />
            <text x={80} y={-40} fill="#000">
              <tspan>{'1 hour'}</tspan>
              <tspan x={120} dy={40}>
                {'= 60 minutes'}
              </tspan>
              <tspan x={120} dy={40}>
                {'= 3 600 s'}
              </tspan>
            </text>
          </g>
          <g transform="translate(0 80)" fill="#ccc">
            <use xlinkHref="#prefix__a" transform="translate(60)" />
            <text x={80} y={-10} fill="#000">
              <tspan>{'1 minute'}</tspan>
              <tspan x={120} dy={40}>
                {'= 60 s'}
              </tspan>
            </text>
          </g>
          <g>
            <circle cx={50} r={10} stroke="#999" fill="none" />
            <use xlinkHref="#prefix__g" transform="translate(50)" />
            <text x={80} y={15}>
              <tspan>{'1 second'}</tspan>
            </text>
          </g>
        </g>
      </defs>
      <use xlinkHref="#prefix__i" />
    </svg>
  );
}

export default SvgComponent;
