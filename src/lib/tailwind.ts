import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "../../tailwind.config.mjs";

const tailwindConfig = resolveConfig(tailwindConfigFile as any);

export default tailwindConfig;
