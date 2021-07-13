import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from "../defaultProps";

const useComponentCommon = (
  props: Readonly<Partial<TextComponentProps>>,
  picks: string[]
) => {
  const styleProps = computed(() => pick(props, picks));
  return {
    styleProps,
  };
};

export default useComponentCommon;
