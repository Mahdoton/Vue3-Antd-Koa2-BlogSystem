import { Notification } from "ant-design-vue"
export const useNotice = (type) => ({
  message,
  description,
  duration = 1
}) => {
  Notification[type]({
    message,
    description,
    duration,
  })
}

export const useSuccessNotice = useNotice("success");
export const useInfoNotice = useNotice("info");
export const useWarningNotice = useNotice("warning");
export const useErrorNotice = useNotice("error");