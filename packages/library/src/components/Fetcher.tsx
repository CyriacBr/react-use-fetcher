import React, { useLayoutEffect, useMemo, useState } from "react";
import { LoadingDisplay } from "./LoadingDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { FetcherRef } from "../fetcherRef";
import { Wrapper } from "./Wrapper";
import { Placeholder } from "./Placeholder";
import { useFetcherStatus } from "..";
import { useFetcherCallback } from "../hooks";

export interface FetcherProps {
  refs: FetcherRef[];
  options?: FetcherOptions;
  Fallback?: React.ComponentType;
}

export interface FetcherOptions {
  handleLoading?: boolean;
  handleError?: boolean;
  errorMessage?: string;
  minDelay?: number;
  loadingColor?: string;
  buttonComponent?: (props: { doRetry: () => void }) => JSX.Element;
  loaderComponent?: (props: { color: string }) => JSX.Element;
  errorComponent?: (props: {
    options: FetcherOptions;
    doRetry: () => void;
    showButton: boolean;
  }) => JSX.Element;
  wrapperClassCSS?: string;
  loadingClassCSS?: string;
  errorClassCSS?: string;
  wrapperStyles?: React.CSSProperties;
  loadingStyles?: React.CSSProperties;
  errorStyles?: React.CSSProperties;
  wrapperBackgroundColor?: string;
  dimBackground?: boolean;
  hideLoader?: boolean;
  progress?: Partial<ProgressOptions>;
  adjustBorderRadius?: boolean;
  placeholder?: Partial<PlaceholderOptions>;
  initialRender?: FetcherOptions;
}

export interface ProgressOptions {
  show?: boolean;
  color?: string;
  errorColor?: string;
  position?: "top" | "bottom";
  styles?: React.CSSProperties;
  valuePerTick: {
    min: number;
    max: number;
  };
  tickDelay: {
    min: number;
    max: number;
  };
}

export interface PlaceholderOptions {
  show?: boolean;
  classTarget?: string;
  wrapperClassCSS?: string;
  wrapperStyles?: React.CSSProperties;
  color?: string;
  highlightColor?: string;
  divide?: boolean;
  truncateLastLine?: boolean;
}

function makeFullOptions(
  options: FetcherOptions,
  nested = true
): FetcherOptions {
  return {
    handleError: true,
    handleLoading: true,
    errorMessage: "An error occured",
    minDelay: 500,
    loadingColor: "#36d7b7",
    buttonComponent: null,
    loaderComponent: null,
    errorComponent: null,
    wrapperClassCSS: "fetcher-wrapper",
    loadingClassCSS: "fetcher-loading",
    errorClassCSS: "fetcher-error",
    adjustBorderRadius: true,
    wrapperBackgroundColor: "#ffffff80",
    dimBackground: true,
    hideLoader: false,
    ...options,
    progress: {
      show: false,
      position: "top",
      color: "#36d7b7",
      errorColor: "#cd3f45",
      tickDelay: { min: 200, max: 300 },
      valuePerTick: { min: 2, max: 3 },
      styles: null,
      ...((options && options.progress) || {})
    },
    placeholder: {
      show: false,
      classTarget: "--p",
      wrapperClassCSS: "placeholder-wrapper",
      color: "#eee",
      highlightColor: "#f5f5f5",
      divide: false,
      truncateLastLine: false,
      ...((options && options.placeholder) || {})
    },
    initialRender: nested
      ? makeFullOptions((options && options.initialRender) || {}, false)
      : undefined
  };
}

const Fetcher: React.FC<FetcherProps> = ({
  refs,
  options,
  children,
  Fallback
}) => {
  const _options = useMemo(() => makeFullOptions(options), [options]);
  const { loading, loadedOnce } = useFetcherStatus(refs);

  useLayoutEffect(() => {
    for (const ref of refs) {
      ref.minDelay = _options.minDelay;
    }
  }, [refs]);

  const Children = loading && Fallback ? <Fallback /> : children;
  const generalOptions = loadedOnce
    ? _options
    : _options.initialRender || _options;
  const placeholderOptions = loadedOnce
    ? _options.placeholder
    : _options.initialRender.placeholder;
  return (
    <>
      <Wrapper refs={refs} options={generalOptions} />
      {placeholderOptions.show ? (
        <Placeholder
          children={Children}
          options={placeholderOptions}
          refs={refs}
        />
      ) : (
        Children
      )}
    </>
  );
};

export { Fetcher };
