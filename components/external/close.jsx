import Button from "./button"

const Close = ({ setIsOpen, ...args }) => {
  return (
    <Button custom='close'>
        <button type="button" className="flex" onClick={() => {setIsOpen(false)}} {...args}>
            <svg fill="none" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </Button>
  )
}

export default Close