import { toast } from 'sonner'

export default function useToast() {
  return {
    toast, 
    success : (message: string) => toast.success(message),
    error : (message: string) => toast.error(message)
  }
}
