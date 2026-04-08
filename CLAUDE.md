# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MagicRemoteService lets you use an LG Magic Remote as a Windows PC mouse/keyboard. It has two components:
- **PC app** (C# / .NET Framework 4.7.2, Windows Forms) - receives WebSocket messages and translates them to Win32 SendInput calls
- **TV app** (HTML5 + Node.js) - captures Magic Remote events via WebOS API and sends them over WebSocket

Communication: WebSocket (TCP, default port 41230) for input data, UDP for Wake-on-LAN. No encryption — local network only.

## Build

Open `MagicRemoteService.sln` in Visual Studio 2022, or use MSBuild directly:

```
MSBuild.exe MagicRemoteService.sln /p:Configuration=Release;Platform="Any CPU"
```

The included `build.bat` references VS 2019 paths and may need updating. Target framework is .NET Framework 4.7.2.

## Architecture

### PC Application (`MagicRemoteService/`)

- **Program.cs** — Entry point. Runs as Windows Service (non-interactive) or WinForms GUI (interactive). Uses named mutexes for single-instance enforcement and event handles for cross-process coordination.
- **Service.cs** — Core logic (~1500 LOC). Hosts WebSocket server, processes incoming messages (mouse position, clicks, keys, wheel, shutdown), and calls Win32 APIs. Supports three modes: `Server` (service only), `Client` (GUI only), `Both`.
- **Application.cs** — WinForms ApplicationContext. System tray icon, power state monitoring, spawns Service instance.
- **Setting.cs** — Configuration UI. Device management, network config, key bindings, startup options. Persists to Windows Registry.
- **Bind.cs** — Key binding abstractions (Mouse, Keyboard, Action, Command bind types).
- **WebOSCLI.cs** — Wrapper for WebOS command-line tool (device setup, app installation).
- **WinApi/** — P/Invoke declarations: `User32.cs` (input/windows), `Advapi32.cs` (services), `Kernel32.cs` (system), plus supporting structure files.

### TV Application (`MagicRemoteService/Resources/TV/`)

- **MagicRemoteService/** — HTML5 UI app. `main.js` captures remote events, manages WebSocket client connection to PC, handles sensor data and Wake-on-LAN.
- **Service/** — Node.js backend service. `service.js` handles logging, UPnP discovery, and developer mode extension.

### Configuration Storage

All settings are in Windows Registry under `HKLM\Software\MagicRemoteService` (or `HKCU` without elevation). Key paths:
- `Device\{GUID}\` — per-TV settings (IP, port, keys, display config)
- `Remote\Bind\` — key binding definitions (hex-keyed)

### Message Protocol

Custom binary protocol over WebSocket with message types: `PositionRelative`, `PositionAbsolute`, `Wheel`, `Key`, `Unicode`, `Visible`, `Shutdown`.

## Dependencies

NuGet packages (via `packages.config`): System.Text.Json 9.0.9 and its transitive dependencies. COM references: NetFwTypeLib (Windows Firewall), TaskScheduler.

## Localization

Resource files support English (default), Spanish (es), and French (fr) in `Properties/` .resx files.
