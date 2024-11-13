{ pkgs }: {
  deps = [
    pkgs.ncdu
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}