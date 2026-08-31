import { Capacitor } from "@capacitor/core";
import { SafeArea } from "capacitor-plugin-safe-area";
import { useEffect, useState } from "react";
import { applySafeAreaInsets, type TSafeAreaInsets } from "@/shared/lib/hooks";

interface IPluginInfo {
    available: boolean;
    name: string;
}

export const PluginsPage = () => {
    const [plugins, setPlugins] = useState<IPluginInfo[]>([]);
    const [safeAreaInsets, setSafeAreaInsets] = useState<TSafeAreaInsets>({
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    });

    useEffect(() => {
        const checkPlugins = async () => {
            const pluginList: IPluginInfo[] = [
                {
                    available: Capacitor.isPluginAvailable("SafeArea"),
                    name: "SafeArea",
                },
                {
                    available: Capacitor.isPluginAvailable("LocalNotifications"),
                    name: "LocalNotifications",
                },
            ];

            setPlugins(pluginList);
        };

        void checkPlugins();

        if (!Capacitor.isNativePlatform()) {
            return;
        }

        let isDisposed = false;
        let listenerHandle: { remove: () => Promise<void> } | null = null;

        const updateSafeArea = (insets: TSafeAreaInsets) => {
            if (isDisposed) {
                return;
            }

            setSafeAreaInsets(insets);
            applySafeAreaInsets(insets);
        };

        void SafeArea.getSafeAreaInsets().then(({ insets }) => {
            updateSafeArea(insets);
        });

        void SafeArea.addListener("safeAreaChanged", ({ insets }) => {
            updateSafeArea(insets);
        }).then(handle => {
            if (isDisposed) {
                void handle.remove();
            } else {
                listenerHandle = handle;
            }
        });

        return () => {
            isDisposed = true;

            if (listenerHandle) {
                void listenerHandle.remove();
            }
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-2xl">Capacitor Plugins Debug</h1>

            <div className="mb-6">
                <h2 className="mb-2 font-semibold text-xl">Platform Info</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    <p>
                        <strong>Platform:</strong> {Capacitor.getPlatform()}
                    </p>
                    <p>
                        <strong>Native:</strong> {Capacitor.isNativePlatform() ? "Yes" : "No"}
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="mb-2 font-semibold text-xl">Installed Plugins</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    {plugins.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="space-y-2">
                            {plugins.map(plugin => (
                                <li className="flex items-center" key={plugin.name}>
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                            plugin.available ? "bg-green-500" : "bg-red-500"
                                        }`}
                                    />
                                    <span>
                                        {plugin.name}:{" "}
                                        {plugin.available ? "Available" : "Not Available"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="mb-2 font-semibold text-xl">Safe Area Insets (from plugin)</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    <p>
                        <strong>Top:</strong> {safeAreaInsets.top}px
                    </p>
                    <p>
                        <strong>Bottom:</strong> {safeAreaInsets.bottom}px
                    </p>
                    <p>
                        <strong>Left:</strong> {safeAreaInsets.left}px
                    </p>
                    <p>
                        <strong>Right:</strong> {safeAreaInsets.right}px
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="mb-2 font-semibold text-xl">CSS env() Test</h2>
                <div
                    className="bg-blue-500 p-4 rounded text-white"
                    style={{
                        marginBottom: `env(safe-area-inset-bottom)`,
                        marginLeft: `env(safe-area-inset-left)`,
                        marginRight: `env(safe-area-inset-right)`,
                        marginTop: `env(safe-area-inset-top)`,
                    }}
                >
                    This box has margins using env(safe-area-inset-*)
                </div>
            </div>
        </div>
    );
};
