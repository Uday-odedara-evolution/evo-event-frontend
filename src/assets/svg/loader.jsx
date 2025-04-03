import dynamic from "next/dynamic";

const LazySvg = async ({ name, ...props }) => {
  const Svg = dynamic(() => import(`./loader.svg`));

  // Or without using `dynamic`:
  // We use `default` here because `@svgr/webpack` converts all other *.svg imports to React components, this might be different for other loaders.
  // const Svg = (await import(`@/assets/${name}.svg`)).default;

  return <Svg {...props} />;
};

export default LazySvg;
