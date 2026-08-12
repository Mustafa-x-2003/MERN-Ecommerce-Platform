import { Spinner } from '@/components/ui/spinner'


export default function LoadingState() {
  return (
    <div className="flex min-h-56 items-center justify-center">
      <Spinner className={"size-10"} />
    </div>
  )
}
