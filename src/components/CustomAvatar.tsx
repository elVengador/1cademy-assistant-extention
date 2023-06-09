import { Box } from '@mui/material'
import React from 'react'
import { DESIGN_SYSTEM_COLORS } from '../utils/colors'


type AvatarSize = "md" | "lg"

type CustomAvatarProps = {
    imageUrl: string,
    alt: string,
    size?: AvatarSize
}

const AVATAR_SIZE_COMPONENTS: { [key in AvatarSize]: { wrapper: string, img: string } } = {
    md: { wrapper: "40px", img: "26px" },
    lg: { wrapper: "48px", img: "32px" }
}

export const CustomAvatar = ({ imageUrl, alt, size = "md" }: CustomAvatarProps) => {

    return (
        <Box sx={{
            minWidth: AVATAR_SIZE_COMPONENTS[size].wrapper,
            width: AVATAR_SIZE_COMPONENTS[size].wrapper,
            minHeight: AVATAR_SIZE_COMPONENTS[size].wrapper,
            height: AVATAR_SIZE_COMPONENTS[size].wrapper,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            backgroundColor: DESIGN_SYSTEM_COLORS.gray100
        }}>
            <img src={imageUrl} alt={alt} style={{
                width: AVATAR_SIZE_COMPONENTS[size].img,
                height: AVATAR_SIZE_COMPONENTS[size].wrapper
            }} />
        </Box>
    )
}
