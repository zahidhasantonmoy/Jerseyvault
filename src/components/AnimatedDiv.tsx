"use client";

import { motion } from "framer-motion";

interface AnimatedDivProps extends React.ComponentProps<typeof motion.div> {
  children?: React.ReactNode;
}

export default function AnimatedDiv({
  children,
  ...props
}: AnimatedDivProps) {
  return <motion.div {...props}>{children}</motion.div>;
}