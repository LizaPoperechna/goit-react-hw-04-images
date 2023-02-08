import { Audio } from 'react-loader-spinner'

export const Loader = () => {
   return <Audio
                height="120"
                width="120"
                radius="9"
                color="blue"
                ariaLabel="loading"
                wrapperStyle={{
                    display: 'block',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                visible={true}
            />

}
