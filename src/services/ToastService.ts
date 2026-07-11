
// @ts-ignore
import toast from 'not-a-toast';
import 'not-a-toast/style.css';


export const ToastService = {
    showNotification(message: string) {
        toast({
            message: message,
            theme: "carbon",
            duration: 4000,
            position: "top-right",
            entryAnimation: "slideInUp",
            exitAnimation: "windLeftOut"
        });
    },
    showError(message: string) {
        toast({
            message: message,
            theme: "legoBrick",
            duration: 4000,
            position: "top-right",
            entryAnimation: "slideInUp",
            exitAnimation: "windLeftOut"
        });
    },
    async showToastForTaskAsync<T>(task: Promise<T>, message: string) {
        var toastElement = toast(
            {
                message: message,
                theme: "carbon",
                duration: 0,
                position: "top-right",
                entryAnimation: "slideInUp",
                exitAnimation: "windLeftOut",
                showIcon: true,
                iconType: "loader",
            });

        var result: T = null as any;

        try {
            result = await task;

            toastElement.update({
                iconType: "success",
                duration: 4000,
            });

        } catch (error) {
            toastElement.update({
                iconType: "error",
                duration: 4000,
                theme: "legoBrick",
            });
        }
        return result;
    },
};