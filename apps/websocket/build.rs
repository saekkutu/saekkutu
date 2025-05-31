use std::io::Result;

fn main() -> Result<()> {
    prost_build::compile_protos(&["../../packages/protocol/main.proto"], &["../../packages/protocol/"])?;

    Ok(())
}